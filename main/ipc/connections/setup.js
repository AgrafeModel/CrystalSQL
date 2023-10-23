const { ipcMain } = require('electron');
const Store = require('electron-store');

const store = new Store({
    name: 'connections',
    defaults: {
        connections: []
    }
});



function setupConnectionEvent() {
    //save connection locally
    ipcMain.on('save-connection', (event, arg) => {
        console.log(arg);
        //save connection
        const connections = store.get('connections')
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
   

}

module.exports = setupConnectionEvent;
