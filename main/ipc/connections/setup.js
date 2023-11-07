const { ipcMain } = require('electron');
const Store = require('electron-store');
const Sequelize = require('sequelize');
const { createDatabaseConnection, testConnection, connectToDatabase, disconnectFromDatabase, makeQuery,getTables } = require('../../helpers/database');
const { connectionStore } = require('../../helpers/stores');





function setupConnectionEvent() {
    //save connection locally
    ipcMain.on('save-connection', (event, arg) => {

        //save connection
        const connections = connectionStore.get('connections')
        //add id
        arg.id = connections.length + 1
        connections.push(arg)
        connectionStore.set('connections', connections)
        event.reply('connection-saved', { success: true, message: 'Connection saved', data: arg })
    })
    //Get all connections
    ipcMain.on('get-connections', (event, arg) => {

        const connections = connectionStore.get('connections')
        event.reply('connections', connections)
    })

    //clear all connections
    ipcMain.on('clear-connections', (event, arg) => {
        connectionStore.clear()
        event.reply('connections-cleared', 'Connections cleared')
    })

    //delete connection by id
    ipcMain.on('delete-connection', (event, arg) => {
        const connections = connectionStore.get('connections')
        const newConnections = connections.filter(connection => connection.id !== arg)
        connectionStore.set('connections', newConnections)
        event.reply('connection-deleted', 'Connection deleted')
    })

    //update connection by id
    ipcMain.on('update-connection', (event, arg) => {
        const connections = connectionStore.get('connections')
        const newConnections = connections.filter(connection => connection.id !== arg.id)
        newConnections.push(arg)
        connectionStore.set('connections', newConnections)
        event.reply('connection-updated', { success: true, message: 'Connection updated', data: arg })
    })

    //test connection
    ipcMain.on('test-connection', (event, arg) => {
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
        const connections = connectionStore.get('connections')
        const connection = connections.find(connection => connection.id === arg)
        //connect to database (the function a sequelize instance or an error object)
        connectToDatabase(connection).then(response => {
            if(response.success){
                event.reply('database-connected', { success: true, message: 'Connection success', data: connection })
            }
            else{
                event.reply('database-connected', { success: false, message: `Connection failed: ${response.message}` })
            }
            
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

    //Get current database connection info
    ipcMain.on('get-database-connection', (event, arg) => {
        const connection = connectionStore.get('connection')
        event.reply('database-connection', connection)
    })


    //get current database tables
    ipcMain.on('get-database-tables', (event, arg) => {
        getTables().then(
            response => {
                event.reply('database-tables', response)
            }
        )
    })



}

export default setupConnectionEvent;