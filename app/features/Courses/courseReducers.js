import initialStoreState from '../../store/initialStoreState';
import { ActionTypes } from '../../constants';

const initialState = initialStoreState.courses;
const types = ActionTypes.courses;

export default function (state = initialState, action) {
    let newstate = state;
    switch (action.type) {
        case types.COURSES_ADDED:
            return action.payload;

        case types.COURSE_ADDED:
            newstate = state;
            newstate.push({
                ...action.payload,
                id: state.length
            });
            return newstate;

        case types.COURSE_REMOVED:
            newstate = state;
            newstate = state.filter((elem: Object) => elem.session_id !== action.payload.session_id);
            return newstate;

        case types.COURSE_EDITTED:
            newstate = state;
            newstate = newstate.map(element => ((element.session_id === action.payload.session_id) ? action.payload : element));
            return newstate;

        default:
            return state;
    }
}
