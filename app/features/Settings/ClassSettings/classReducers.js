import initialStoreState from '../../../store/initialStoreState';
import { ActionTypes } from '../../../constants';

const initialState = initialStoreState.classSettings;
const types = ActionTypes.classPeriods;

export default function (state = initialState, action) {
    let newstate = state;
    switch (action.type) {
        case types.SESSIONS_ADDED:
            return action.payload;

        case types.SESSION_ADDED:
            newstate = state;
            newstate.push({
                ...action.payload,
                id: state.length
            });
            return newstate;
            
        case types.SESSION_REMOVED:
            newstate = state;
            newstate = state.filter((elem: Object) => elem.id !== action.payload.id);
           return newstate;

        case types.SESSION_EDITTED:
            newstate = state;
            newstate = newstate.map((element) => (element.id !== action.payload.id) ? action.payload : element);
            return newstate;   
        default:
            return state;
    }
}
