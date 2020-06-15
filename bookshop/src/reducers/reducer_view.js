import { VIEW_ACTIONS } from '../actions/actions_view';

export function ViewReducer(state = null, action) {
    switch (action.type) {
        case VIEW_ACTIONS.CHANGED:
            return action.view;
        default:
            return state;
    };
}