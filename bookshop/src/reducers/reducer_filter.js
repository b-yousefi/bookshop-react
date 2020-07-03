import { FILTER_ACTIONS } from '../actions/actions_filter';
import { AUTHOR_ACTIONS } from '../actions/action_authors';
import { CAT_ACTIONS } from '../actions/actions_categories';
import { PUBLICATION_ACTIONS } from '../actions/actions_publicaion';

export function FilterReducer(state = null, action) {
    let newState = {
        publicationIds: [],
        categoryIds: [],
        authorIds: [],
    };
    switch (action.type) {
        case FILTER_ACTIONS.SET:
        case FILTER_ACTIONS.CLEAR:
            newState = action.data;
            break;
        case AUTHOR_ACTIONS.SELECT:
            newState.authorIds = [action.author];
            break;
        case CAT_ACTIONS.SELECT:
            newState.categoryIds = [action.category];
            break;
        case PUBLICATION_ACTIONS.SELECT:
            newState.publicationIds = [action.publication];
            break;
        default:
            return state;
    }
    return newState;
}