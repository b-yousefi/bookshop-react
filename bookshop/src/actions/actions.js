export const COMMON = {
    SET_NOTIF: 'SET_NOTIF',
    CLEAR_NOTIF: 'CLEAR_NOTIF',
    ERROR: 'error',
    SUCCESS: 'success'
};

export function clearNotif() {
    return {
        type: COMMON.CLEAR_NOTIF,
    }
}

export function setSucc(action, msg = "Successfull") {
    return {
        ...action, notif: {
            message: msg,
            cause: action.type,
            severity: COMMON.SUCCESS
        }
    }
}

export function setError(error, cause = null) {

    return {
        type: COMMON.SET_NOTIF,
        payload: error,
        notif: {
            message: "Error",
            cause: cause,
            severity: COMMON.ERROR
        }
    }
}