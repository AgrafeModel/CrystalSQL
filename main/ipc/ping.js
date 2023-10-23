const { ipcMain } = require('electron');

function setupPingEvent() {
  ipcMain.on('ping', (event, arg) => {
    console.log('Ping from renderer: ' + arg);
    // Répondez avec un "pong"
    event.reply('pong', 'Pong from main process');
  });
}

module.exports = setupPingEvent;