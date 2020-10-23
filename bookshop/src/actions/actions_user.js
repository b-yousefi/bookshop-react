import axios from "axios";
import { setError, setSucc } from "./actions";
import {
  clearShoppingCart,
  SHOPPING_CART_ACTIONS,
} from "./actions_shopping_cart";
import { ORDER_ACTIONS } from "./actions_order";

const USER_URL = `${process.env.REACT_APP_API_URL}/api/users`;
const ORDERS_PAGE_SIZE = 6;

export const USER_ACTIONS = {
  FETCH: "USER_FETCH",
  UPDATE: "USER_UPDATE",
  DELETE: "USER_DELETE",
  REGISTER: "USER_REGISTER",
  LOGIN: "USER_LOGIN",
  LOGOUT: "USER_LOGOUT",
};

export function fetchUser(username) {
  const url = `${USER_URL}/search/findUser?username=${username}`;
  return (dispatch) => {
    axios
      .get(url)
      .then((response) => {
        dispatch({
          type: USER_ACTIONS.FETCH,
          payload: response,
        });
        dispatch({
          type: SHOPPING_CART_ACTIONS.FETCH,
          payload: { data: response.data.openOrder },
        });
      })
      .catch((error) => {
        dispatch(setError(error.response, USER_ACTIONS.FETCH));
      });
  };
}

export function loginUser(credentials) {
  const url = `${process.env.REACT_APP_API_URL}/api/authenticate`;
  return (dispatch) => {
    axios({
      method: "POST",
      url,
      data: JSON.stringify(credentials),
    })
      .then((response) => {
        const token = `Token ${response.data.token}`;
        axios.defaults.headers.common["Authorization"] = token;
        dispatch(fetchUser(credentials.username));
        dispatch({
          type: USER_ACTIONS.LOGIN,
          payload: { username: credentials.username, token },
        });
      })
      .catch((error) => {
        dispatch(setError(error.response, USER_ACTIONS.LOGIN));
      });
  };
}

export function logoutUser() {
  delete axios.defaults.headers.common["Authorization"];
  return (dispatch) => {
    dispatch({
      type: USER_ACTIONS.LOGOUT,
      payload: "",
    });
    dispatch(clearShoppingCart());
  };
}

export function regsiterUser(user) {
  const url = `${process.env.REACT_APP_API_URL}/api/register`;
  return (dispatch) => {
    axios
      .post(url, JSON.stringify(user))
      .then((response) => {
        dispatch(
          setSucc({
            type: USER_ACTIONS.REGISTER,
            payload: response.data,
          })
        );
        dispatch(
          loginUser({ username: user.username, password: user.password })
        );
      })
      .catch((error) => {
        dispatch(setError(error.response, USER_ACTIONS.REGISTER));
      });
  };
}

export function updateUser(user) {
  const url = user.link;
  return (dispatch) => {
    axios
      .patch(url, JSON.stringify(user))
      .then((response) => {
        dispatch(
          setSucc({
            type: USER_ACTIONS.UPDATE,
            payload: response.data,
          })
        );
      })
      .catch((error) => {
        dispatch(setError(error.response, USER_ACTIONS.UPDATE));
      });
  };
}

export function fetchUserOrders(page = 1) {
  return (dispatch, getState) => {
    const userId = getState().user.id;
    axios
      .get(
        `${USER_URL}/${userId}/orders?page=${
          page - 1
        }&size=${ORDERS_PAGE_SIZE}&sort=id,desc`
      )
      .then((response) => {
        dispatch({
          type: ORDER_ACTIONS.FETCH_ALL,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch(setError(error.response, ORDER_ACTIONS.FETCH_ALL));
      });
  };
}
