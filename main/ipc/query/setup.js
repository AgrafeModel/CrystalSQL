const { ipcMain } = require('electron');
const Store = require('electron-store');
const Sequelize = require('sequelize');
const { makeQuery,databaseInstance } = require('../../helpers/database');
const { queryStore,connectionStore } = require('../../helpers/stores');




function setupQueryEvent() {

    
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

    //save query
    ipcMain.on('save-query', (event, arg) => {
        //check if their a connection in instance
        if (databaseInstance.connection === null) {
            event.reply('query-saved', { success: false, message: 'No connection selected' })
        } else {
            //save query
            const queries = queryStore.get('queries')
            queries[databaseInstance.connection.id] = queries[databaseInstance.connection.id] || []
            //add id
            arg.id = queries[databaseInstance.connection.id].length + 1
            queries[databaseInstance.connection.id].push(arg)
            queryStore.set('queries', queries)
            event.reply('query-saved', { success: true, message: 'Query saved' })
        }
    })

    //get all queries for current connection
    ipcMain.on('get-queries', (event, arg) => {
        //check if their a connection in instance
        if (databaseInstance.connection === null) {
            event.reply('queries', { success: false, message: 'No connection selected' })
        } else {
            const queries = queryStore.get('queries')
            const connectionQueries = queries[databaseInstance.connection.id] || []
            event.reply('queries', { success: true, data: connectionQueries })
        }
    })

    //clear all queries for current connection
    ipcMain.on('clear-queries', (event, arg) => {
        //check if their a connection in instance
        if (databaseInstance.connection === null) {
            event.reply('queries-cleared', { success: false, message: 'No connection selected' })
        } else {
            const queries = queryStore.get('queries')
            queries[databaseInstance.connection.id] = []
            queryStore.set('queries', queries)
            event.reply('queries-cleared', { success: true, message: 'Queries cleared' })
        }
    })

    //delete query by id
    ipcMain.on('delete-query', (event, arg) => {
        //check if their a connection in instance
        if (databaseInstance.connection === null) {
            event.reply('query-deleted', { success: false, message: 'No connection selected' })
        } else {
            const queries = queryStore.get('queries')
            const newQueries = queries[databaseInstance.connection.id].filter(query => query.id !== arg)
            queries[databaseInstance.connection.id] = newQueries
            queryStore.set('queries', queries)
            event.reply('query-deleted', { success: true, message: 'Query deleted' })
        }
    })

    //update query by id
    ipcMain.on('update-query', (event, arg) => {
        //check if their a connection in instance
        if (databaseInstance.connection === null) {
            event.reply('query-updated', { success: false, message: 'No connection selected' })
        } else {
            const queries = queryStore.get('queries')
            //find query
            const query = queries[databaseInstance.connection.id].find(query => query.id === arg.id)
            //update query
            query.name = arg.name
            query.query = arg.query
            queryStore.set('queries', queries)
            event.reply('query-updated', { success: true, message: 'Query updated' })
        }
    })

    


    

}

export default setupQueryEvent;