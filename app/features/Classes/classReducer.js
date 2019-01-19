import initialStoreState from '../../store/initialStoreState';
import {ActionTypes} from '../../constants';

const initialState = initialStoreState.classes;
const types = ActionTypes.classes;

export default function (state = initialState, action) {
    let newstate = state;
    switch (action.type) {
        case types.CLASSES_ADDED:
            return action.payload;

        case types.CLASS_ADDED:
            newstate = state;
            newstate.push({
                ...action.payload,
                id: state.length
            });
            return newstate;

        case types.CLASS_REMOVED:
            newstate = state;
            newstate = state.filter((elem: Object) => elem.session_count !== action.payload.session_count);
            return newstate;

        case types.CLASS_EDITTED:
            newstate = state;
            newstate = newstate.map(element => ((element.session_count === action.payload.session_count) ? action.payload : element));
            return newstate;
        
        default:
            return state;     
    }        
}
