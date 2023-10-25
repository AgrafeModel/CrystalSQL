const { ipcMain } = require('electron');
const { BrowserWindow } = require('electron');



function setupAppEvents() {
    //close app
    //stop app 
    ipcMain.on("stop-app", () => {
        app.quit();
    });

    //toggle maximize or unmaximize
    ipcMain.on("toggle-maximize", () => {
        const window = BrowserWindow.getFocusedWindow();
        if (window.isMaximized()) {
            window.unmaximize();
        } else {
            window.maximize();
        }
    });

    //minimize app
    ipcMain.on("minimize-app", () => {
        const window = BrowserWindow.getFocusedWindow();
        window.minimize();
    });
    

    //close app
    ipcMain.on("close-app", () => {
        const window = BrowserWindow.getFocusedWindow();
        window.close();
    });


}

module.exports = setupAppEvents;