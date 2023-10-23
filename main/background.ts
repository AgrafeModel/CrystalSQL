import path from "path";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import fs from "fs";
import setupPingEvent from "./ipc/ping";
import setupConnectionEvent from "./ipc/connections/setup";


const isProd = process.env.NODE_ENV === "production";


if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}



(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    //windows --> screen size
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

setupPingEvent();
setupConnectionEvent();
