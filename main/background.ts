import path from "path";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import fs from "fs";
import setupPingEvent from "./ipc/ping";
import setupConnectionEvent from "./ipc/connections/setup";
import setupAppEvents from "./ipc/app";
import setupQueryEvent from "./ipc/query/setup";
import setupDashboardEvents from "./ipc/dashboard/setup";

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
    show: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "../resources/icon.ico"), //don't show top bar icon
    frame: false,

   
    
  });
  if (isProd) {


    await mainWindow.loadURL("app://./");
  } else {
    const port = process.argv[2];
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
setupDashboardEvents();






