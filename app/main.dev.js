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

import { app, BrowserWindow } from 'electron';
import path from 'path';
import modules from 'module';

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
        width: 1024,
        height: 768,
        minWidth: 800,
        minHeight: 600,
        show: false
    });

    // Disable the menu bar and set as full screen always
    mainWindow.maximize();

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

window_to_PDF = new BrowserWindow({show : false});//to just open the browser in background
window_to_PDF.loadURL(`file://${__dirname}/index.html`); //give the file link you want to display
function pdfSettings() {
    var paperSizeArray = ["A4", "A5"];
    var option = {
        landscape: false,
        marginsType: 0,
        printBackground: false,
        printSelectionOnly: false,
        pageSize: paperSizeArray[settingCache.getPrintPaperSize()-1],
    };
  return option;
}
window_to_PDF.webContents.printToPDF(pdfSettings(), function(err, data) {
    if (err) {
        console.log('Successful');
        return;
    }
    try{
        fs.writeFileSync('./generated_pdf.pdf', data);
    }catch(err){
        console.log('unSuccessful')
        //unable to save pdf..
    }
   
})
