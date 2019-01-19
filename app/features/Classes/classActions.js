import { ActionTypes } from '../../constants';

export function classesLoaded() {
    // TODO: check inside SQLite for data
    const dataFromSQLite = [];

    return {
        type: ActionTypes.classes.CLASSES_ADDED,
        payload: dataFromSQLite
    };
}

export function classEditted(payload: Object) {
    return {
        type: ActionTypes.classes.CLASS_EDITTED,
        payload
    };
}

export function classAdded(payload: Object) {
    return {
        type: ActionTypes.classes.CLASS_ADDED,
        payload
    };
}


export function classRemoved(payload: Object) {
    return {
        type: ActionTypes.classes.CLASS_REMOVED,
        payload
    }
}