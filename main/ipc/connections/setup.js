const { ipcMain } = require('electron');
const Store = require('electron-store');
const Sequelize = require('sequelize');
const { createDatabaseConnection, testConnection, connectToDatabase, disconnectFromDatabase, makeQuery } = require('../../helpers/database');


const store = new Store({
    name: 'connections',
    defaults: {
        connections: [],
        currentConnection: {}
    }
});



function setupConnectionEvent() {
    //save connection locally
    ipcMain.on('save-connection', (event, arg) => {
        console.log(arg);
        //save connection
        const connections = store.get('connections')
        //add id
        arg.id = connections.length + 1
        connections.push(arg)
        store.set('connections', connections)
        event.reply('connection-saved', 'Connection saved')
    })
    //Get all connections
    ipcMain.on('get-connections', (event, arg) => {

        const connections = store.get('connections')
        console.log(connections)
        event.reply('connections', connections)
    })

    //clear all connections
    ipcMain.on('clear-connections', (event, arg) => {
        store.clear()
        event.reply('connections-cleared', 'Connections cleared')
    })

    //delete connection by id
    ipcMain.on('delete-connection', (event, arg) => {
        const connections = store.get('connections')
        console.log(connections)
        const newConnections = connections.filter(connection => connection.id !== arg)
        console.log(newConnections)
        store.set('connections', newConnections)
        event.reply('connection-deleted', 'Connection deleted')
    })

    //update connection by id
    ipcMain.on('update-connection', (event, arg) => {
        const connections = store.get('connections')
        console.log(connections)
        const newConnections = connections.filter(connection => connection.id !== arg.id)
        console.log(newConnections)
        newConnections.push(arg)
        store.set('connections', newConnections)
        event.reply('connection-updated', 'Connection updated')
    })

    //test connection
    ipcMain.on('test-connection', (event, arg) => {
        console.log(arg)
        const sequelize = createDatabaseConnection(arg.type, arg)
        //test connection
        testConnection(sequelize).then(response => {
            console.log(response)
            event.reply('connection-tested', response)
        })
            .catch(error => {
                console.log(error)
                event.reply('connection-tested', error)
            }
            )
    })

    //connect to database by id
    ipcMain.on('connect-to-database', (event, arg) => {
        const connections = store.get('connections')
        const connection = connections.find(connection => connection.id === arg)
        console.log(connection)
        //connect to database (the function a sequelize instance or an error object)
        connectToDatabase(connection).then(response => {
            console.log("Connected to database successfully")
            event.reply('database-connected', { success: true, message: 'Connection successful', data: connection })
        })
            .catch(error => {
                console.log(error)
                event.reply('database-connected', { success: false, message: `Connection failed: ${error.message}` })
            })


    })

    //disconnect from database
    ipcMain.on('disconnect-from-database', (event, arg) => {
        disconnectFromDatabase()
        event.reply('database-disconnected', 'Database disconnected')
    })

    //make query
    ipcMain.on('make-query', (event, arg) => {
        console.log(arg)
        makeQuery(arg)
        .then(response => {
            console.log(response)
            //check if  it's an error
            if (response.success) {
               event.reply('query-made', { success: true, data: response.data })
            } else {
                event.reply('query-made', { success: false, message: `Query failed: ${response.message}` })
            }
        })
            .catch(error => {
                event.reply('query-made', { success: false, message: `Query failed: ${error.message}` })
            }
            )
    })

    //change page
    






}

export default setupConnectionEvent;