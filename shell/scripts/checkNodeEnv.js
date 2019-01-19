/*
 * @Author: Kenneth Kwakye-Gyamfi 
 * @Date: 2017-11-09 12:08:51 
 * @Last Modified by: Kenneth Kwakye-Gyamfi
 * @Last Modified time: 2017-12-27 08:32:46
 * 
 * Check if the node environment specified is the actual node environment being used
 */

import chalk from 'chalk';

export default function checkNodeEnv(expectedEnv: string) {
    if (!expectedEnv) {
        throw new Error('"expectedEnv" not set');
    }

    if (process.env.NODE_ENV !== expectedEnv) {
        // eslint-disable-next-line
        console.log(chalk.whiteBright.bgRed.bold(
            `"process.env.NODE_ENV" must be "${expectedEnv}" to use this webpack config`
        ));
        process.exit(2);
    }
}
