import { ActionTypes } from '../../../constants';

export function collegesLoaded() {
    // TODO: check inside SQLite for data
     const dataFromSQLite = [];

    return {
        type: ActionTypes.colleges.COLLEGES_ADDED,
        payload: dataFromSQLite
    };
}

export function collegeEditted(payload: Object) {
    return {
        type: ActionTypes.colleges.COLLEGE_EDITTED,
        payload
    };
}

export function collegeAdded(payload: Object) {
    return {
        type: ActionTypes.colleges.COLLEGE_ADDED,
        payload
    };
}


export function collegeRemoved(payload: Object) {
    return {
        type: ActionTypes.colleges.COLLEGE_REMOVED,
        payload
    };
}