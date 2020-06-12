import { USER_ACTIONS } from '../actions/actions_user';

export function UserReducer(state = null, action) {
    switch (action.type) {
        case USER_ACTIONS.FETCH:
            return { ...state, ...action.payload.data };
        case USER_ACTIONS.LOGIN:
            return { username: action.payload, isLoggedIn: true };
        case USER_ACTIONS.LOGOUT:
            return { isLoggedIn: false };
        case USER_ACTIONS.REGISTER:
            return { ...action.payload, isLoggedIn: false };
        case USER_ACTIONS.UPDATE:
            return { ...action.payload, isLoggedIn: state.isLoggedIn };
        default:
            return state;
    };
}