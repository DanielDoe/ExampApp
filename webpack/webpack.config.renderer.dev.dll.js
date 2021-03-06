/*
 * @Author: Kenneth Kwakye-Gyamfi 
 * @Date: 2017-11-09 12:20:04 
 * @Last Modified by: Kenneth Kwakye-Gyamfi
 * @Last Modified time: 2017-12-27 09:35:58
 * 
 * Builds the DLL for development electron renderer process
 */

import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';

import baseConfig from './webpack.config.base';
import { dependencies } from '../package.json';
import checkNodeEnv from '../shell/scripts/checkNodeEnv';

checkNodeEnv('development');

const destination = path.resolve(process.cwd(), 'dll');

export default merge.smart(baseConfig, {
	context: path.resolve(process.cwd()),

	devtool: 'eval',

	target: 'electron-renderer',

	externals: ['fsevents', 'crypto-browserify'],

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						plugins: [
							// Here, we include babel plugins that are only required for the
							// renderer process. The 'transform-*' plugins must be included
							// before react-hot-loader/babel
							'transform-class-properties',
							'transform-es2015-classes',
							'react-hot-loader/babel'
						],
					}
				}
			},
			// CSS Font
			{
				test: /[A-Za-z0-9-_.]*\.css/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: { sourceMap: true, },
					}
				]
			},
			// WOFF Font
			{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'application/font-woff',
					}
				},
			},
			// WOFF2 Font
			{
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'application/font-woff',
					}
				}
			},
			// TTF Font
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'application/octet-stream'
					}
				}
			},
			// EOT Font
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				use: 'file-loader',
			},
			// SVG Font
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'image/svg+xml',
					}
				}
			},
			// Common Image Formats
			{
				test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
				use: 'url-loader',
			}
		]
	},

	resolve: {
		modules: [
			'app'
		]
	},

	entry: { renderer: (Object.keys(dependencies || {}).filter(dependency => dependency !== 'font-awesome')) },

	output: {
		library: 'renderer',
		path: destination,
		filename: '[name].dev.dll.js',
		libraryTarget: 'var'
	},

	plugins: [
		new webpack.DllPlugin({
			path: path.resolve(destination, '[name].json'),
			name: '[name]',
		}),

		/*
		 * Create global constants which can be configured at compile time.
		 *
		 * Useful for allowing different behaviour between development builds and
		 * release builds
		 *
		 * NODE_ENV should be production so that modules do not perform certain
		 * development checks
		 */
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') }),

		new webpack.LoaderOptionsPlugin({
			debug: true,
			options: {
				context: path.resolve(process.cwd(), 'app'),
				output: { path: path.resolve(process.cwd(), 'dll'), },
			},
		})
	]
});
