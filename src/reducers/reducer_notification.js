import { COMMON } from '../actions/actions';


export function NotificationReducer(state = null, action) {
    if (action.type === COMMON.SET_NOTIF) {
        if (action.payload && action.payload.message) {
            return { ...action.notif, message: action.payload.message };
        } else {
            return action.notif;
        }
    } else if (action.type === COMMON.CLEAR_NOTIF) {
        return null;
    } else if (action.notif) {
        return action.notif;
    }
    return state;

}