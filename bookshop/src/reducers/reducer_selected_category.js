import { CAT_ACTIONS } from '../actions/actions_categories';

export function SelectedCategoryReducer(state = null, action) {
    switch (action.type) {
        case CAT_ACTIONS.SELECT:
            return action.category;
        default:
            return state;
    }
}