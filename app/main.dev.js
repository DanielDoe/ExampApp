/*
 * @Author: Kenneth Kwakye-Gyamfi 
 * @Date: 2017-12-27 08:39:23 
 * @Last Modified by: Kenneth Kwakye-Gyamfi
 * @Last Modified time: 2017-12-27 20:07:48
 * 
 * Electron Start Point
 * Module to create the main window and attach listeners to the main window.
 * Executes inside electron's main process. Renderer processes can be started here
 * and IPC can also be done here.
 * 
 * Compiled to main.prod.js when `npm run build` or `npm run build:main` is run
 */
/* eslint global-require:0 */

import {
    app,
    BrowserWindow,
    ipcMain,
    Notification
} from 'electron';
import fs from 'fs';
import path from 'path';
import modules from 'module';
const notifier = require('electron-notifications');

import MenuBuilder from './menu';

let mainWindow = null;

const isDev = (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true');
const isProd = (process.env.NODE_ENV === 'production');

async function installExtensions() {
    const installer = require('electron-devtools-installer');
    const extensions: Array = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
    const forceDownload: boolean = !!process.env.UPGRAGE_EXTENSIONS;

    return Promise
        .all(extensions.map(name => installer.default(installer[name], forceDownload)))
        .catch(console.error);
}

if (isProd) {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

if (isDev) {
    require('electron-debug')();

    const nodeModules = path.join(__dirname, '..', 'app', 'node_modules');
    modules.globalPaths.push(nodeModules);
}

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', async () => {
    if (isDev) {
        await installExtensions();
    }

    mainWindow = new BrowserWindow({
        width: 1380,
        height: 930,
        minWidth: 1280,
        minHeight: 800,
        show: false,
        icon: __dirname + '/desktop.png'
    });

    // Disable the menu bar and set as full screen always
    mainWindow.maximize();

    mainWindow.setMenu(null);

    // Setup the location of the index.html and pass it as a file
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.webContents.on('did-finish-load', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }

        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.on('closed', () => {
        // Dereference the main window.
        // TODO even though there is a memory footprint, we will find a way to take it out later
        mainWindow = null;
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();
});

function doNotify(message){
    notifier.notify('Report status', {
        message: message,
        buttons: ['Dismiss'],
      })
}

ipcMain.on('GENERATION', async (_, message) => {
    // Write the content of the message to an HTML file using fs
    const filename = await writeFile(message);

    // Open a new window
    let childWindow = null;
    childWindow = new BrowserWindow({
        width: 1200,
        height: 700,
        minWidth: 900,
        minHeight: 600,
        show: false
    })
    childWindow.loadURL(filename);

    childWindow.webContents.on('did-finish-load', () => {
        if (!childWindow) {
            throw new Error('"childWindow" is not defined');
        }

        childWindow.webContents.printToPDF({marginsType: 0}, (error, data) => {
            if (error) {
                throw error;
            }

            fs.writeFile(`${filename}.pdf`, data, (err) => {
                if (err) {

                    doNotify('Unable to generate report');
                    throw err;
                }

                childWindow.close();
                doNotify('Report generated successfully. Check your desktop');
                console.log('Complete');
            });
        });
        // childWindow.show();
        // childWindow.focus();
    });

    childWindow.on('closed', () => {
        // Dereference the main window.
        // TODO even though there is a memory footprint, we will find a way to take it out later
        childWindow = null;
    });

    // Generate PDF

    // Close window

    // Send PDF Success back to renderer thread
    // console.log(event, message);
})

function writeFile(content) {
    return new Promise((resolve, reject) => {
        const filename = path.resolve(app.getPath('desktop'), 'Report')
        fs.writeFile(filename, content, (err, output) => {
            if (err) {
                return reject(err);
            }
            resolve(filename);
        })
    })
}