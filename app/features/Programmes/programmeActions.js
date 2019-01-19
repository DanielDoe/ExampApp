import { ActionTypes } from '../../constants';

export function programmesLoaded() {
    // TODO: check inside SQLite for data
     const dataFromSQLite = [];

    return {
        type: ActionTypes.programmes.PROGRAMMES_ADDED,
        payload: dataFromSQLite
    };
}

export function programmeEditted(payload: Object) {
    return {
        type: ActionTypes.programmes.PROGRAMME_EDITTED,
        payload
    };
}

export function programmeAdded(payload: Object) {
    return {
        type: ActionTypes.programmes.PROGRAMME_ADDED,
        payload
    };
}


export function programmeRemoved(payload: Object) {
    return {
        type: ActionTypes.programmes.PROGRAMME_REMOVED,
        payload
    };
}
