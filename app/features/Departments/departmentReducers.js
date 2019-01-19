import initialStoreState from '../../store/initialStoreState';
import { ActionTypes } from '../../constants';

const initialState = initialStoreState.departments;
const types = ActionTypes.departments;

export default function (state = initialState, action) {
    let newstate = state;
    switch (action.type) {
        case types.DEPARTMENTS_ADDED:
            return action.payload;

        case types.DEPARTMENT_ADDED:
            newstate = state;
            newstate.push({
                ...action.payload,
                id: state.length
            });
            return newstate;

        case types.DEPARTMENT_REMOVED:
            newstate = state;
            newstate = state.filter((elem: Object) => elem.id !== action.payload.id);
            return newstate;

        case types.DEPARTMENT_EDITTED:
            newstate = state;
            newstate = newstate.map(element => ((element.id === action.payload.id) ? action.payload : element));
            return newstate;


        default:
            return state;
    }
}
