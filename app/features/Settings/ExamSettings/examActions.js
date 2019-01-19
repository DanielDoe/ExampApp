import { ActionTypes } from '../../../constants';

export function examSessionLoaded() {
    // TODO: check inside SQLite for data
     const dataFromSQLite = [];

    return {
        type: ActionTypes.exam_session.EXAM_SESSIONS_ADDED,
        payload: dataFromSQLite
    };
}

export function examSessionEditted(payload: Object) {
    return {
        type: ActionTypes.exam_session.EXAM_SESSION_EDITTED,
        payload
    };
}

export function examSessionAdded(payload: Object) {
    return {
        type: ActionTypes.exam_session.EXAM_SESSION_ADDED,
        payload
    };
}


export function examSessionRemoved(payload: Object) {
    return {
        type: ActionTypes.exam_session.EXAM_SESSION_REMOVED,
        payload
    };
}