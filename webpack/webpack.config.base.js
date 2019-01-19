/*
 * @Author: Kenneth Kwakye-Gyamfi 
 * @Date: 2017-11-09 12:13:01 
 * @Last Modified by: Kenneth Kwakye-Gyamfi
 * @Last Modified time: 2017-12-27 09:35:08
 *
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import { dependencies as externals } from '../app/package.json';

export default {
    externals: Object.keys(externals || {}),
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: { cacheDirectory: true }
            }
        }]
    },
    output: {
        path: path.resolve(process.cwd(), 'app'),
        filename: 'renderer.dev.js',
        // https://github.com/webpack/webpack/issues/1114
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [path.resolve(process.cwd(), 'app'), 'node_modules']
    },
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production') }),
        new webpack.NamedModulesPlugin()
    ]
};
