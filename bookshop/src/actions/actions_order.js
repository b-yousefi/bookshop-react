import axios from "axios";
import { setError, setSucc } from "./actions";
import { fetchUserOrders } from "./actions_user";

const ORDER_URL = `${process.env.REACT_APP_API_URL}/api/orders`;

export const ORDER_ACTIONS = {
  FETCH_ALL: "ORDER_FETCH_ALL",
  UPDATE: "ORDER_UPDATE",
  DELETE: "ORDER_DELETE",
  CREATE: "ORDER_CREATE",
  CLOSE: "ORDER_CLOSE",
  FETCH: "ORDER_FETCH",
};

export function completeOrder(address) {
  return (dispatch, getState) => {
    const user = getState().user;
    const addressLink = address._links.self.href;
    const changedOrder = {
      id: getState().shopping_cart.id,
      address: addressLink,
      user: user._links.self.href,
    };
    const url = `${ORDER_URL}/close_shopping_cart`;
    axios({
      method: "POST",
      url,
      data: JSON.stringify(changedOrder),
    })
      .then((response) => {
        dispatch(
          setSucc({
            type: ORDER_ACTIONS.CLOSE,
            payload: response,
          })
        );
        // dispatch(fetchShoppingCart());
        dispatch(fetchUserOrders());
      })
      .catch((error) => {
        dispatch(setError(error.response, ORDER_ACTIONS.CLOSE));
      });
  };
}

export function fetchOrderDetail(order) {
  return (dispatch) => {
    axios
      .get(order._links.self.href)
      .then((response) => {
        dispatch({
          type: ORDER_ACTIONS.FETCH,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch(setError(error.response, ORDER_ACTIONS.FETCH));
      });
  };
}
