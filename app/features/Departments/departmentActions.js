import { ActionTypes } from '../../constants';

export function departmentsLoaded() {
    // TODO: check inside SQLite for data
     const dataFromSQLite = [];

    return {
        type: ActionTypes.departments.DEPARTMENTS_ADDED,
        payload: dataFromSQLite
    };
}

export function departmentEditted(payload: Object) {
    return {
        type: ActionTypes.departments.DEPARTMENT_EDITTED,
        payload
    };
}

export function departmentAdded(payload: Object) {
    return {
        type: ActionTypes.departments.DEPARTMENT_ADDED,
        payload
    };
}


export function departmentRemoved(payload: Object) {
    return {
        type: ActionTypes.departments.DEPARTMENT_REMOVED,
        payload
    }
}