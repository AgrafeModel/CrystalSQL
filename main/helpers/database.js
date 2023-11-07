import Sequelize from 'sequelize';
import Store from 'electron-store';

//store for saving connections locally
const store = new Store({
    name: 'connections',
    defaults: {
        connections: [],
        currentConnection: {}
    }
});

const databaseInstance ={
    sequelize: null,
    connection: null
}

/**
 * @brief Create sequelize instance based on database type
 * @param {*} databaseType  database type (mysql, postgres, mssql, mariadb, sqlite, oracle)
 * @param {*} options  database connection options
 * @returns  sequelize instance
 */
function createDatabaseConnection(databaseType, options) {
    // Configure Sequelize with the appropriate dialect and options based on the databaseType
    let dialect = '';
    switch (databaseType) {
        case 'mysql':
            dialect = 'mysql';
            break;
        case 'postgres':
            dialect = 'postgres';
            break;
        case 'mssql':
            dialect = 'mssql';
            break;
        case 'mariadb':
            dialect = 'mariadb';
            break;
        case 'sqlite':
            dialect = 'sqlite';
            break;
        case 'oracle':
            dialect = 'oracle';
            break;
        default:
            throw new Error('Unsupported database type');
    }

    const sequelize = new Sequelize(options.database, options.username, options.password, {
        host: options.host,
        dialect,

    });

    return sequelize;
}

/**
 * @brief Test connection to database using sequelize
 * @param {*} sequelize  sequelize instance
 * @returns success message if connection is successful, error message if connection fails
 */
async function testConnection(sequelize) {
    try {
      await sequelize.authenticate();
      return { success: true, message: 'Connection successful' };
    } catch (error) {
      return { success: false, message: `Connection failed: ${error.message}` };
    }
}

/**
 * @brief Connect to database using sequelize
 * @param {*} connection connection object with type and options 
 * @returns sequelize instance if connection is successful, error object if connection fails
 */
async function connectToDatabase(connection) {
    //create sequelize instance
    const sequelize = createDatabaseConnection(connection.type, connection);
    //test connection
    const test = await testConnection(sequelize);
    console.log(test);
    if (test.success) {
        //save connection to store
        store.set('currentConnection', connection);
        //store the sequelize instance
        databaseInstance.sequelize = sequelize;
        databaseInstance.connection = connection;
        //return sequelize instance (success)
        return { success: true, message: 'Connection successful', sequelize };
    }
    else {
        //return error
        return { success: false, message: `Connection failed: ${test.message}` };
    }
}

async function disconnectFromDatabase() {
    //disconnect from database
    if (databaseInstance.sequelize !== null) {
        await databaseInstance.sequelize.close();
        databaseInstance.sequelize = null;
        databaseInstance.connection = null;
    }
}




/**
 * @brief Make query to database
 * @param {*} query  query string
 * @returns  result of query
 */
async function makeQuery(query) {
    //check if databaseInstance is set
    if (databaseInstance.sequelize === null) {
        //get current connection from store
        const connection = store.get('currentConnection');
        //connect to database
        await connectToDatabase(connection);
    }
    //make query
    try {
        const result = await databaseInstance.sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
        return { success: true, data: result };
    }
    catch (error) {
        return { success: false, message: `Query failed: ${error.message}` };
    }
}


/**
 * @brief Get tables of the current database connection
 */
async function getTables(){
    //get the sequelize instance
    const sequelize = databaseInstance.sequelize;
    //check if sequelize instance is set
    if(sequelize === null){
        //get current connection from store
        const connection = store.get('currentConnection');
        //if connection is not set return error
        if(connection === undefined){
            return { success: false, message: 'No connection set' };
        }
        //connect to database
        await connectToDatabase(connection);

    }
    //make query
    try {
        const result = await sequelize.query("SHOW TABLES", { type: Sequelize.QueryTypes.SELECT });
        let tables = [];
        result.forEach((table) => {
            tables.push(table[`Tables_in_${databaseInstance.connection.database}`]);
        });
        return { success: true, data: tables };
    }
    catch (error) {
        return { success: false, message: `Query failed: ${error.message}` };
    }
}



export { connectToDatabase, disconnectFromDatabase, makeQuery, getTables, databaseInstance, store };