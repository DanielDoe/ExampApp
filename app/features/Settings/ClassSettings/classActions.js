import { ActionTypes } from '../../../constants';

export function classPeriodsLoaded() {
    // TODO: check inside SQLite for data
     const dataFromSQLite = [];

    return {
        type: ActionTypes.classPeriods.SESSIONS_ADDED,
        payload: dataFromSQLite
    };
}

export function classPeriodEditted(payload: Object) {
    return {
        type: ActionTypes.classPeriods.SESSION_EDITTED,
        payload
    };
}

export function classPeriodAdded(payload: Object) {
    return {
        type: ActionTypes.classPeriods.SESSIONS_ADDED,
        payload
    };
}


export function classPeriodRemoved(payload: Object) {
    return {
        type: ActionTypes.classPeriods.SESSION_REMOVED,
        payload
    };
}