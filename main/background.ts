import path from "path";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import fs from "fs";
import setupPingEvent from "./ipc/ping";
import setupConnectionEvent from "./ipc/connections/setup";
import setupAppEvents from "./ipc/app";
import setupQueryEvent from "./ipc/query/setup";


const isProd = process.env.NODE_ENV === "production";


if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
  
}

//set userModelId
app.setAppUserModelId('com.amethyst.app');



(async () => {
  await app.whenReady();



  const mainWindow = createWindow("main", {
    
    width: 1000,
    height: 600,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "../resources/icon.ico"), //don't show top bar icon
    frame: false,

   
    
  });

  var splash = createWindow("splash", {
    width: 500, 
    height: 300, 
    transparent: true, 
    frame: false, 
    alwaysOnTop: true,
    icon: path.join(__dirname, "../resources/icon.ico"), //don't show top bar icon
  });




  //when main window is ready to show, destroy splash window and show the main window
  mainWindow.once('ready-to-show', () => {
    splash.destroy();
    mainWindow.show();
  });



  if (isProd) {

    await splash.loadURL("app://./splash.html");
    await mainWindow.loadURL("app://./");
  } else {
    const port = process.argv[2];
    await splash.loadURL(`http://localhost:${port}/splash`);
    await mainWindow.loadURL(`http://localhost:${port}/`);
    mainWindow.webContents.openDevTools();

  }
})();

app.on("window-all-closed", () => {
  app.quit();
});


setupAppEvents();
setupPingEvent();
setupQueryEvent();
setupConnectionEvent();






