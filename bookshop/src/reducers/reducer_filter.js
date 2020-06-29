import { FILTER_ACTIONS } from '../actions/actions_filter';

export function FilterReducer(state = null, action) {
    switch (action.type) {
        case FILTER_ACTIONS.SET:
        case FILTER_ACTIONS.CLEAR:
            return action.data;
        default:
            return state;
    }
}