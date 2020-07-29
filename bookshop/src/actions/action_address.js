import axios from 'axios';
import {setError, setSucc} from './actions';

const ADDRESS_URL = `${process.env.REACT_APP_API_URL}/api/addresses`;

export const ADDRESS_ACTIONS = {
    FETCH: 'ADDRESS_FETCH',
    UPDATE: 'ADDRESS_UPDATE',
    DELETE: 'ADDRESS_DELETE',
    CREATE: 'ADDRESS_CREATE',
    SELECT: 'ADDRESS_SELECT',
};

export function fetchAddresses() {
    return (dispatch, getState) => {
        const username = getState().user.username;
        const url = `${ADDRESS_URL}/search/findAllByUser_username?username=${username}`;
        axios.get(url)
            .then(response => {
                dispatch(
                    {
                        type: ADDRESS_ACTIONS.FETCH,
                        payload: response
                    }
                );
            }).catch(error => {
            dispatch(
                setError(error.response, ADDRESS_ACTIONS.FETCH)
            );
        })
    }
}

export function deleteAddress(address) {
    return (dispatch) => {
        const url = `${ADDRESS_URL}/${address.id}`;
        axios.delete(url)
            .then(response => {
                dispatch(setSucc(
                    {
                        type: ADDRESS_ACTIONS.DELETE,
                        payload: response,
                        id: address.id
                    }
                ));
            }).catch(error => {
            dispatch(
                setError(error.response, ADDRESS_ACTIONS.DELETE)
            );
        })
    }
}

export function addAddress(address) {
    return (dispatch, getState) => {
        const user = getState().user._links.self.href;
        const newAddress = {...address, user};
        const url = `${ADDRESS_URL}`;
        axios(
            {
                method: 'POST',
                url,
                data: JSON.stringify(newAddress)
            }
        ).then(response => {
            dispatch(setSucc(
                {
                    type: ADDRESS_ACTIONS.CREATE,
                    payload: response
                }
            ));
        }).catch(error => {
            dispatch(
                setError(error.response, ADDRESS_ACTIONS.CREATE)
            );
        })
    }
}

export function updateAddress(address) {
    const url = address.link;
    return (dispatch) => {
        axios.patch(url, JSON.stringify(address))
            .then(response => {
                dispatch(setSucc(
                    {
                        type: ADDRESS_ACTIONS.UPDATE,
                        payload: response
                    }
                ));
            }).catch(error => {
            dispatch(
                setError(error.response, ADDRESS_ACTIONS.UPDATE)
            );
        })
    }
}