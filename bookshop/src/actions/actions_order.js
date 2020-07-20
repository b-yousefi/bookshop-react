import axios from 'axios';
import {setError} from './actions';

const ORDER_URL = `${process.env.REACT_APP_API_URL}/api/orders`;

export const ORDER_ACTIONS = {
    FILTER: 'ORDER_FETCH',
    UPDATE: 'ORDER_UPDATE',
    DELETE: 'ORDER_DELETE',
    CREATE: 'ORDER_CREATE',
};