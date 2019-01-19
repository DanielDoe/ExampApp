/*
 * @Author: Kenneth Kwakye-Gyamfi 
 * @Date: 2017-11-09 12:05:16 
 * @Last Modified by: Kenneth Kwakye-Gyamfi
 * @Last Modified time: 2017-12-27 08:30:05
 * 
 * Check if the renderer and main bundles are built
 */

import path from 'path';
import chalk from 'chalk';
import fs from 'fs';

function checkBuildsExist() {
    const main = path.resolve(process.cwd(), 'app', 'main.prod.js');
    const renderer = path.resolve(process.cwd(), 'app', 'build', 'renderer.prod.js');

    if (!fs.existsSync(main)) {
        throw new Error(chalk.whiteBright.bgRed.bold(
            'The main process is not built yet. Build it by running "npm run build-main"'
        ));
    }

    if (!fs.existsSync(renderer)) {
        throw new Error(chalk.whiteBright.bgRed.bold(
            'The renderer process is not built yet. Build it by running "npm run build-renderer"'
        ));
    }
}

checkBuildsExist();
