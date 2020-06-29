import axios from 'axios';
import { setError } from './actions';

const PUBLICATION_URL = `${process.env.REACT_APP_API_URL}/api/publications`;

export const PUBLICATION_ACTIONS = {
    FETCH: 'PUBLICATION_FETCH', UPDATE: 'PUBLICATION_UPDATE',
    DELETE: 'PUBLICATION_DELETE', CREATE: 'PUBLICATION_CREATE'
};

export function fetchPublications() {
    return dispatch => {
        axios.get(PUBLICATION_URL)
            .then(response => {
                dispatch(
                    {
                        type: PUBLICATION_ACTIONS.FETCH,
                        payload: response
                    }
                );
            }).catch(error => {
                dispatch(
                    setError(error.response.data, PUBLICATION_ACTIONS.FETCH)
                );
            })
    }
}