import initialStoreState from '../../../store/initialStoreState';
import { ActionTypes } from '../../../constants';

const initialState = initialStoreState.colleges;
const types = ActionTypes.colleges;

export default function (state = initialState, action) {
    let newstate = state;
    switch (action.type) {
        case types.COLLEGES_ADDED:
            return action.payload;

        case types.COLLEGE_ADDED:
            newstate = state;
            newstate.push({
                ...action.payload,
                id: state.length
            });
            return newstate;
            
        case types.COLLEGE_REMOVED:
            newstate = state;
            newstate = state.filter((elem: Object) => elem.item !== action.payload.item);
            return newstate;

        case types.COLLEGE_EDITTED:
            newstate = state;
            newstate = newstate.map(element => ((element.item === action.payload.item) ? action.payload : element));
            return newstate;   
        default:
            return state;
    }
}
