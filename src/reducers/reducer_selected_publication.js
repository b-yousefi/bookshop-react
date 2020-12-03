import { PUBLICATION_ACTIONS } from '../actions/actions_publicaion';

export function SelectedPublicationReducer(state = null, action) {
    switch (action.type) {
        case PUBLICATION_ACTIONS.SELECT:
            return action.publication;
        default:
            return state;
    }
}