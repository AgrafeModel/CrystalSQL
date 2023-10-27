const { ipcMain } = require('electron');
const Store = require('electron-store');
const Sequelize = require('sequelize');
const { makeQuery,databaseInstance } = require('../../helpers/database');
const { dashboardStore,connectionStore } = require('../../helpers/stores');


/*
    Dashboard example:
    {
        id: null,
        title: 'New Dashboard',
        description: 'Customize this dashboard',
        widgets: [
            {
                id: 1,
                title: "New Dashboard",
                description: "Customize this dashboard",
                type: "text",
                content: "Customize this dashboard",
                width: 5,
                height: 1,
                dashboardId: null
            },
        ],
    }
*/

function setupDashboardEvents(){

    //new dashboard
    ipcMain.on('new-dashboard', (event, arg) => {
        //check if their a connection in instance
        if (databaseInstance.connection === null) {
            event.reply('dashboard-created', { success: false, message: 'No connection selected' })
        } else {
            //save dashboard
            const dashboards = dashboardStore.get('dashboards')
            dashboards[databaseInstance.connection.id] = dashboards[databaseInstance.connection.id] || []
            //get a unique id for the dashboard
            arg.id = Date.now()
            dashboards[databaseInstance.connection.id].push(arg)
            //update dashboardId in widgets
            arg.widgets = arg.widgets.map(widget => { widget.dashboardId = arg.id; return widget })
            dashboardStore.set('dashboards', dashboards)
            event.reply('dashboard-created', { success: true, message: 'Dashboard created', data: dashboards[databaseInstance.connection.id] })
        }
    })

    //get all dashboards for current connection
    ipcMain.on('get-dashboards', (event, arg) => {
        //check if their a connection in instance
        if (databaseInstance.connection === null) {
            event.reply('dashboards', { success: false, message: 'No connection selected' })
        } else {
            console.log("Getting dashboards for connection for:", databaseInstance.connection.id)
            const dashboards = dashboardStore.get('dashboards')
            const connectionDashboards = dashboards[databaseInstance.connection.id] || []
            event.reply('dashboards', { success: true, data: connectionDashboards })
        }
    })

    //delete dashboard
    ipcMain.on('delete-dashboard', (event, arg) => {
        //check if their a connection in instance
        if (databaseInstance.connection === null) {
            event.reply('dashboard-deleted', { success: false, message: 'No connection selected' })
        } else {
            console.log("Deleting dashboard for connection for:", databaseInstance.connection.id)
            //delete dashboard by id
            const dashboards = dashboardStore.get('dashboards')
            const connectionDashboards = dashboards[databaseInstance.connection.id] || []
            const newDashboards = connectionDashboards.filter(dashboard => dashboard.id !== arg)
            dashboards[databaseInstance.connection.id] = newDashboards
            dashboardStore.set('dashboards', dashboards)
            event.reply('dashboard-deleted', { success: true, message: 'Dashboard deleted', data: {id: arg} })
        

        }
    })

    //update dashboard
    ipcMain.on('update-dashboard', (event, arg) => {
        //check if their a connection in instance
        if (databaseInstance.connection === null) {
            event.reply('dashboard-updated', { success: false, message: 'No connection selected' })
        } else {
            //update dashboard
            const dashboards = dashboardStore.get('dashboards')
            const connectionDashboards = dashboards[databaseInstance.connection.id] || []
            const newDashboards = connectionDashboards.map(dashboard => {
                if (dashboard.id === arg.id) {
                    return arg
                }
                return dashboard
            })
            dashboards[databaseInstance.connection.id] = newDashboards
            dashboardStore.set('dashboards', dashboards)
            event.reply('dashboard-updated', { success: true, message: 'Dashboard updated', data: arg })
        }
    })

    //get dashboard by id
    ipcMain.on('get-dashboard', (event, arg) => {
        //check if their a connection in instance
        if (databaseInstance.connection === null) {
            event.reply('dashboard', { success: false, message: 'No connection selected' })
        } else {
            //get dashboard
            const dashboards = dashboardStore.get('dashboards')
            const connectionDashboards = dashboards[databaseInstance.connection.id] || []
            const dashboard = connectionDashboards.find(dashboard => dashboard.id === arg)
            event.reply('dashboard', { success: true, data: dashboard })
        }
    })

}


export default setupDashboardEvents;