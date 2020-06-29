import axios from 'axios';
import { setError } from './actions';

const BOOK_URL = `${process.env.REACT_APP_API_URL}/api/books`;

export const BOOK_ACTIONS = {
    FILTER: 'BOOK_FILTER', UPDATE: 'BOOK_UPDATE',
    DELETE: 'BOOK_DELETE', CREATE: 'BOOK_CREATE'
};

export function filterBooks(filter) {
    console.log(filter);
    const url = `${BOOK_URL}/filter?publicationIds=${filter.publicationIds.map(f => f.id)}&categoryIds=${filter.categoryIds.map(f => f.id)}&authorIds=${filter.authorIds.map(f => f.id)}`
    console.log(url);
    return dispatch => {
        axios.get(url)
            .then(response => {
                dispatch(
                    {
                        type: BOOK_ACTIONS.FILTER,
                        payload: response
                    }
                );
            }).catch(error => {
                dispatch(
                    setError(error.response.data, BOOK_ACTIONS.FILTER)
                );
            })
    }
}

export function fetchBooks() {
    return dispatch => {
        dispatch(filterBooks({ publicationIds: [], categoryIds: [], authorIds: [] }))
    }
}