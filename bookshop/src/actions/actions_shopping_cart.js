import axios from 'axios';
import {setError, setSucc} from './actions';

const USER_URL = `${process.env.REACT_APP_API_URL}/api/users`;
const ORDER_ITEMS_URL = `${process.env.REACT_APP_API_URL}/api/order_items`;

export const SHOPPING_CART_ACTIONS = {
    FETCH: 'SHOPPING_CART_FETCH',
    UPDATE: 'SHOPPING_CART_UPDATE',
    CLEAR: 'SHOPPING_CART_CLEAR',
};

export function fetchShoppingCart(username) {
    const url = `${USER_URL}/get_shopping_cart?username=${username}`;
    return dispatch => {
        axios.get(url)
            .then(response => {
                dispatch(
                    {
                        type: SHOPPING_CART_ACTIONS.FETCH,
                        payload: response
                    }
                );
            }).catch(error => {
            dispatch(
                setError(error.response.data, SHOPPING_CART_ACTIONS.FETCH)
            );
        })
    }
}

export function clearShoppingCart() {
    return {
        type: SHOPPING_CART_ACTIONS.CLEAR,
    }
}

export function updateShoppingCart(book, quantity) {
    return (dispatch, getState) => {
        let orderItemId = null;
        if (getState().shopping_cart.booksMap.has(book.id)) {
            orderItemId = getState().shopping_cart.booksMap.get(book.id).orderItemId;
        }
        const orderItem = {
            id: orderItemId,
            book: book._links.self.href,
            quantity,
            order: getState().shopping_cart._links.self.href
        };
        const url = `${ORDER_ITEMS_URL}/update_shopping_cart`;

        axios.post(url, JSON.stringify(orderItem))
            .then(response => {
                dispatch(setSucc({
                    type: SHOPPING_CART_ACTIONS.UPDATE,
                    payload: response
                }));
            })
            .catch(error => {
                dispatch(
                    setError(error.response.data, SHOPPING_CART_ACTIONS.UPDATE)
                );
            });
    }
}