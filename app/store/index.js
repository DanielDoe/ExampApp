/*
 * @Author: Kenneth Kwakye-Gyamfi 
 * @Date: 2017-11-08 22:16:29 
 * @Last Modified by: Kenneth Kwakye-Gyamfi
 * @Last Modified time: 2017-12-27 08:44:21
 */
/* eslint global-require: 0 */


if (process.env.NODE_ENV === 'production') {
    module.exports = require('./store.prod');

} else {
    module.exports = require('./store.dev');
}
