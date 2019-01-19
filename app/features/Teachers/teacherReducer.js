import initialStoreState from '../../store/initialStoreState';
import { ActionTypes } from '../../constants';

const initialState = initialStoreState.teachers;
const types = ActionTypes.teachers;

export default function (state = initialState, action) {
    let newstate = state;
    switch (action.type) {
        case types.TEACHERS_ADDED:
            return action.payload;

        case types.TEACHER_ADDED:
            newstate = state;
            newstate.push({
                ...action.payload,
                id: state.length,
            });
            return newstate;
            
        case types.TEACHER_REMOVED:
            newstate = state;
            newstate = state.filter((elem: Object) => elem.name !== action.payload.name);
            return newstate;

        case types.TEACHER_EDITTED:
            newstate = state;
            newstate = newstate.map(element => ((element.name === action.payload.name) ? { ...action.payload, id: element.id } : element));
            return newstate;   
            
        default:
            return state;
    }
}
