import { ActionTypes } from '../../constants';

export function allocationsLoaded() {
    // TODO: check inside SQLite for data
     const dataFromSQLite = [];

    return {
        type: ActionTypes.allocations.ALLOCATIONS_ADDED,
        payload: dataFromSQLite
    };
}

export function allocationEditted(payload: Object) {
    return {
        type: ActionTypes.allocations.ALLOCATION_EDITTED,
        payload
    };
}

export function allocationAdded(payload: Object) {
    return {
        type: ActionTypes.allocations.ALLOCATIONS_ADDED,
        payload
    };
}


export function allocationRemoved(payload: Object) {
    return {
        type: ActionTypes.allocations.ALLOCATION_REMOVED,
        payload
    };
}