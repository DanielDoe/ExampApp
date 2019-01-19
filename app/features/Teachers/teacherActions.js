import { ActionTypes } from '../../constants';

export function teachersLoaded() {
    // TODO: check inside SQLite for data
     const dataFromSQLite = [];

    return {
        type: ActionTypes.teachers.TEACHERS_ADDED,
        payload: dataFromSQLite
    };
}

export function teacherEditted(payload: Object) {
    return {
        type: ActionTypes.teachers.TEACHER_EDITTED,
        payload
    };
}

export function teacherAdded(payload: Object) {
    return {
        type: ActionTypes.teachers.TEACHER_ADDED,
        payload
    };
}


export function teacherRemoved(payload: Object) {
    return {
        type: ActionTypes.teachers.TEACHER_REMOVED,
        payload
    }
}