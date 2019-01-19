/*
 * @Author: Kenneth Kwakye-Gyamfi 
 * @Date: 2017-11-09 13:29:39 
 * @Last Modified by: Kenneth Kwakye-Gyamfi
 * @Last Modified time: 2017-12-27 08:34:41
 * 
 * Decide on the test to run. Runs scripts based on the e2e or unit tests (deprecated)
 */

const spawn = require('cross-spawn');
const path = require('path');

const separator = `\\${path.sep}`;
const pattern = process.argv[2] === 'e2e' ?
    `test${separator}e2e${separator}.+\\.spec\\.js` :
    `test${separator}(?!e2e${separator})[^${separator}]+${separator}.+\\.spec\\.js$`;

const result = spawn.sync(
    path.normalize('./node_modules/.bin/jest'),
    [pattern, ...process.argv.slice(2)],
    { stdio: 'inherit' }
);

process.exit(result.status);
