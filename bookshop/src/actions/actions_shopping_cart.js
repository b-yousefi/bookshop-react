import axios from "axios";
import { setError, setSucc } from "./actions";

const USER_URL = `${process.env.REACT_APP_API_URL}/api/users`;

export const SHOPPING_CART_ACTIONS = {
  FETCH: "SHOPPING_CART_FETCH",
  ADD: "SHOPPING_CART_ADD",
  UPDATE: "SHOPPING_CART_UPDATE",
  DELETE: "SHOPPING_CART_DELETE",
  CLEAR: "SHOPPING_CART_CLEAR",
};

export function fetchShoppingCart() {
  return (dispatch, getState) => {
    const userId = getState().user.id;
    const url = `${USER_URL}/${userId}/shopping_cart`;
    axios
      .get(url)
      .then((response) => {
        dispatch({
          type: SHOPPING_CART_ACTIONS.FETCH,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch(setError(error.response, SHOPPING_CART_ACTIONS.FETCH));
      });
  };
}

export function clearShoppingCart() {
  return {
    type: SHOPPING_CART_ACTIONS.CLEAR,
  };
}

export function updateShoppingCart(book, quantity) {
  return (dispatch, getState) => {
    let orderItemId = null;
    if (getState().shopping_cart.booksMap.has(book.id)) {
      orderItemId = getState().shopping_cart.booksMap.get(book.id).orderItemId;
    }
    if (quantity === 0) {
      dispatch(deleteItemFromShoppingCart(orderItemId, book.id));
    } else if (orderItemId) {
      dispatch(updateOrderItemInShoppingCart(orderItemId, book, quantity));
    } else {
      dispatch(addItemToShoppingCart(book, quantity));
    }
  };
}

function updateOrderItemInShoppingCart(orderItemId, book, quantity) {
  return (dispatch, getState) => {
    const orderItem = {
      book: book._links.self.href,
      quantity,
    };
    const orderId = getState().shopping_cart.id;
    const userId = getState().user.id;
    const url = `${USER_URL}/${userId}/orders/${orderId}/order_items/${orderItemId}`;

    axios
      .patch(url, JSON.stringify(orderItem))
      .then((response) => {
        dispatch(
          setSucc({
            type: SHOPPING_CART_ACTIONS.UPDATE,
            payload: response,
          })
        );
      })
      .catch((error) => {
        dispatch(setError(error.response, SHOPPING_CART_ACTIONS.UPDATE));
      });
  };
}

function addItemToShoppingCart(book, quantity) {
  return (dispatch, getState) => {
    const orderId = getState().shopping_cart.id;
    const userId = getState().user.id;
    const orderItem = {
      book: book._links.self.href,
      quantity,
    };
    const url = `${USER_URL}/${userId}/orders/${orderId}/order_items`;
    axios
      .post(url, JSON.stringify(orderItem))
      .then((response) => {
        dispatch(
          setSucc({
            type: SHOPPING_CART_ACTIONS.ADD,
            payload: response,
          })
        );
      })
      .catch((error) => {
        dispatch(setError(error.response, SHOPPING_CART_ACTIONS.ADD));
      });
  };
}

function deleteItemFromShoppingCart(orderItemId, orderItemBookId) {
  return (dispatch, getState) => {
    const orderId = getState().shopping_cart.id;
    const userId = getState().user.id;
    const url = `${USER_URL}/${userId}/orders/${orderId}/order_items/${orderItemId}`;

    axios
      .delete(url)
      .then(() => {
        dispatch(
          setSucc({
            type: SHOPPING_CART_ACTIONS.DELETE,
            orderItemId: orderItemId,
            orderItemBookId: orderItemBookId,
          })
        );
      })
      .catch((error) => {
        dispatch(setError(error.response, SHOPPING_CART_ACTIONS.DELETE));
      });
  };
}
