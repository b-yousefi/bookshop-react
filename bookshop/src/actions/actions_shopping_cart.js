import axios from 'axios';
import {setError, setSucc} from './actions';

const USER_URL = `${process.env.REACT_APP_API_URL}/api/users`;
const ORDER_ITEMS_URL = `${process.env.REACT_APP_API_URL}/api/order_items`;

export const SHOPPING_CART_ACTIONS = {
    FETCH: 'SHOPPING_CART_FETCH',
    UPDATE: 'SHOPPING_CART_UPDATE',
    UPDATE_ITEM: 'SHOPPING_CART_UPDATE_ITEM',
    REMOVE_ITEM: 'SHOPPING_CART_REMOVE_ITEM',
    ADD_ITEM: 'SHOPPING_CART_ADD_ITEM',
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

function getOrderItem(shopping_cart, book, quantity) {
    let orderItemId = null;
    if (shopping_cart.booksMap.has(book.id)) {
        orderItemId = shopping_cart.booksMap.get(book.id).orderItemId;
    }
    return {
        id: orderItemId,
        book: book._links.self.href,
        quantity,
        order: shopping_cart._links.self.href
    };
}

export function addBookToShoppingCart(book, quantity) {
    return (dispatch, getState) => {
        const orderItem = getOrderItem(getState().shopping_cart, book, quantity);
        const username = getState().user.username;
        const url = `${ORDER_ITEMS_URL}/add_book_to_shopping_cart`;

        axios.post(url, JSON.stringify(orderItem))
            .then(response => {
                dispatch(setSucc({
                    type: SHOPPING_CART_ACTIONS.ADD_ITEM,
                    payload: response,
                    orderItem: orderItem
                }));
                dispatch(fetchShoppingCart(username));
            })
            .catch(error => {
                dispatch(
                    setError(error.response.data, SHOPPING_CART_ACTIONS.ADD_ITEM)
                );
            });
    }
}

export function removeBookFromShoppingCart(book, quantity) {
    return (dispatch, getState) => {
        const orderItem = getOrderItem(getState().shopping_cart, book, quantity);
        const username = getState().user.username;
        const url = `${ORDER_ITEMS_URL}/remove_book_from_shopping_cart`;

        axios.post(url, JSON.stringify(orderItem))
            .then(response => {
                dispatch(setSucc({
                    type: SHOPPING_CART_ACTIONS.REMOVE_ITEM,
                    payload: response,
                    orderItem: orderItem
                }));
                dispatch(fetchShoppingCart(username));
            })
            .catch(error => {
                dispatch(
                    setError(error.response.data, SHOPPING_CART_ACTIONS.REMOVE_ITEM)
                );
            });
    }
}