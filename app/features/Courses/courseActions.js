import { ActionTypes } from '../../constants';

export function coursesLoaded() {
    // TODO: check inside SQLite for data
     const dataFromSQLite = [];

    return {
        type: ActionTypes.courses.COURSES_ADDED,
        payload: dataFromSQLite
    };
}

export function courseEditted(payload: Object) {
    return {
        type: ActionTypes.courses.COURSE_EDITTED,
        payload
    };
}

export function courseAdded(payload: Object) {
    return {
        type: ActionTypes.courses.COURSE_ADDED,
        payload
    };
}


export function courseRemoved(payload: Object) {
    return {
        type: ActionTypes.courses.COURSE_REMOVED,
        payload
    }
}