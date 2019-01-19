// import fs from 'fs';
// import path from 'path';
// // import size from 'lodash/size';
// // import request from 'request';
// import { remote } from 'electron'; 
// import { Constants } from '../constants';
// // import { SQLiteSchema, getSecureAxiosInstance, processErrorResponse } from '../services';
// import { ensureDirectoryExists } from './utilities';

// const { app } = remote;

// const Database = require('better-sqlite3');

// // Ensure the directory is created because createDatabase() WILL throw an error if not created
// const databaseDir = path.resolve(app.getPath('appData'), 'asqiiTimetable');
// ensureDirectoryExists(databaseDir);

// const DATABASE_FILEPATH = path.resolve(databaseDir, Constants.app.DATABASE_NAME);
// let globalDatabaseRefernece; // dbase singleton

// /**
//  *    .................................  SQLITE .....................................
//  */

// /**
//  * Get an SQLite instance for storing and retrieving data.
//  */
// export function getSQLInstance(): * {
// 	if (!globalDatabaseRefernece) globalDatabaseRefernece = new Database(DATABASE_FILEPATH);
// 	return globalDatabaseRefernece;
// }

// /**
//  * Close the database.
//  * This is done in order to save memory
//  */
// export function closeDatabase(sqlInstance: any): void {
// 	sqlInstance.close();
// }

// export function checkIfDatabaseExists(): boolean {
// 	return fs.existsSync(DATABASE_FILEPATH);
// }

// export function runQuery(preparedQuery: string, params?: Array<Object>): * {
// 	const db = getSQLInstance();
// 	const stmt = db.prepare(preparedQuery);
// 	let info = null;

// 	if (params) {
// 		params.forEach(parameters => {
// 			info = stmt.run(parameters);
// 		});
// 	} else info = stmt.run();

// 	return info;
// }

// /**
//  * USE ONLY FOR SELECT QUERIES
//  * returns either an array of objects or an iterator depending
//  * on the returnMode that is passed
//  */
// export function runSelectQuery(
// 	query: string,
// 	params: Array<any> = [],
// 	returnMode: string = Constants.misc.SQL_RETURN_MODE_ALL
// ): * {
// 	const db = getSQLInstance();
// 	const stmt = db.prepare(query);

// 	const output = returnMode === 'ITERATOR' ? stmt.iterate() : stmt.all();
// 	return output;
// }

import path from 'path';
import fs from 'fs';
import { Constants } from '../../../constants';

// const dbname = 'asqiiTimetable.db';
const dbname = 'examdb.db';
const DATABASE_FILEPATH = path.resolve(process.cwd(), dbname);
const Database = require('better-sqlite3');

let globalDatabaseReference;

/**
 *    .................................  SQLITE .....................................
 */

/**
 * Get an SQLite instance for storing and retrieving data.
 */
export function getSQLInstance(): * {
	if (!globalDatabaseReference) globalDatabaseReference = new Database(DATABASE_FILEPATH);
	return globalDatabaseReference;
}


/**
 * Close the database.
 * This is done in order to save memory
 */
export function closeDatabase(sqlInstance: any): void {
	sqlInstance.close();
}

export function checkIfDatabaseExists(): boolean {
	return fs.existsSync(DATABASE_FILEPATH);
}

export function runQuery(preparedQuery: string, params?: Array<Object>): * {
	const db = getSQLInstance();
	const stmt = db.prepare(preparedQuery);
	let info = null;

	if (params) {
		params.forEach(parameters => {
			info = stmt.run(parameters);
		});
	} else info = stmt.run();

	return info;
}

/**
 * USE ONLY FOR SELECT QUERIES
 * returns either an array of objects or an iterator depending
 * on the returnMode that is passed
 */
export function runSelectQuery(
	query: string,
	params: Array<any> = [],
	returnMode: string = Constants.misc.SQL_RETURN_MODE_ALL
): * {
	const db = getSQLInstance();
	const stmt = db.prepare(query);

	const output = returnMode === 'ITERATOR' ? stmt.iterate() : stmt.all();
	return output;
}
