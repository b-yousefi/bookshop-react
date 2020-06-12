import axios from 'axios';
const Category_URL = `${process.env.REACT_APP_API_URL}/api/categories`;

export const CAT_ACTIONS = { FETCH: 'CAT_FETCH', UPDATE: 'CAT_UPDATE', DELETE: 'CAT_DELETE', CREATE: 'CAT_CREATE' };

export function fetchCategories() {
    const url = `${Category_URL}/allcategories`;
    const request = axios.get(url);

    return {
        type: CAT_ACTIONS.FETCH,
        payload: request
    }
}