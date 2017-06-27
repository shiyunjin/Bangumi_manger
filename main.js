'use strict';

const electron = require('electron');
const {app, BrowserWindow, Menu, ipcMain, ipcRenderer} = electron;
const env = require( './lib/env.js' );

const path = require('path');
const url = require('url');

let isDevelopment = true;

if (isDevelopment) {
    require('electron-reload')(__dirname, {
        ignored: /node_modules|[\/\\]\./
    });
}

let Manger = require( './lib/manger.js' );
Manger.boot();

var mainWindow = null;
var APP_NAME = 'Bangumi Manger';


let shouldQuit = app.makeSingleInstance( function ( commandLine, workingDirectory ) {
    // Someone tried to run a second instance, we should focus our window
    if ( mainWindow ) {
        if ( mainWindow.isMinimized() ) {
            mainWindow.restore();
        }
        mainWindow.focus();
    }
    return true;
});

if ( shouldQuit ) {
    app.quit();
    return;
}


function createmainWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 700,
        icon: 'public/img/app-icon.png',
        resizable: false,
        'accept-first-mouse': true,
        'title': APP_NAME,
        'show': false,
        'frame': false,
        'transparent': true

    });

    if (isDevelopment) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }));

	mainWindow.webContents.on( 'did-finish-load', function () {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
       mainWindow = null;
    });
}


app.on('ready', createmainWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createmainWindow();
  }
});

ipcMain.on( 'open-dev', function ( event ) {
    event.returnValue = true;
    mainWindow.webContents.openDevTools();
});

ipcMain.on( 'app-quit', function ( event ) {
    event.returnValue = true;
    mainWindow.close();
});

ipcMain.on( 'app-minimize', function ( event ) {
    event.returnValue = true;
    mainWindow.minimize();
});
