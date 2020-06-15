import axios from 'axios';
import { setError } from '../actions/actions';

const Category_URL = `${process.env.REACT_APP_API_URL}/api/categories`;

export const CAT_ACTIONS = { FETCH: 'CAT_FETCH', UPDATE: 'CAT_UPDATE', DELETE: 'CAT_DELETE', CREATE: 'CAT_CREATE' };

export function fetchCategories() {
    const url = `${Category_URL}/allcategories`;
    return dispatch => {
        axios.get(url)
            .then(response => {
                dispatch(
                    {
                        type: CAT_ACTIONS.FETCH,
                        payload: response
                    }
                );
            }).catch(error => {
                dispatch(
                    setError(error, CAT_ACTIONS.FETCH)
                );
            })
    }
}