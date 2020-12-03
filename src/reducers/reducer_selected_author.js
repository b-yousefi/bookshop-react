import { AUTHOR_ACTIONS } from '../actions/action_authors';

export function SelectedAuthorReducer(state = null, action) {
    switch (action.type) {
        case AUTHOR_ACTIONS.SELECT:
            return action.author;
        default:
            return state;
    }
}