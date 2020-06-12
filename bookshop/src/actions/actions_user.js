import axios from 'axios';
const USER_URL = `${process.env.REACT_APP_API_URL}/api/users`;

export const USER_ACTIONS = { FETCH: 'USER_FETCH', UPDATE: 'USER_UPDATE', DELETE: 'USER_DELETE', REGISTER: 'USER_REGISTER', LOGIN: 'USER_LOGIN', LOGOUT: 'USER_LOGOUT' };

export function fetchUser(username) {
    const url = `${USER_URL}/search/findUser?username=${username}`;
    const request = axios.get(url);

    return {
        type: USER_ACTIONS.FETCH,
        payload: request
    }
}

export function loginUser(credentials) {
    const url = `${process.env.REACT_APP_API_URL}/authenticate`;

    axios(
        {
            method: 'POST',
            url,
            data: JSON.stringify(credentials)
        }
    ).then((response) => {
        axios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
    })

    return {
        type: USER_ACTIONS.LOGIN,
        payload: credentials.username
    }
}


export function logoutUser() {
    delete axios.defaults.headers.common["Authorization"];

    return {
        type: USER_ACTIONS.LOGOUT,
        payload: ''
    }
}

export function regsiterUser(user) {
    const url = `${process.env.REACT_APP_API_URL}/register`;
    const request = axios.post(url, JSON.stringify(user));

    return {
        type: USER_ACTIONS.REGISTER,
        payload: request
    }
}

export function updateUser(user) {
    const url = user.link;
    const request = axios.put(url, JSON.stringify(user));

    return {
        type: USER_ACTIONS.UPDATE,
        payload: request
    }
}