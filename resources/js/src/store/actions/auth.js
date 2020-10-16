import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const registerStart = registerInfo => {
    return {
        type: actionTypes.REGISTER_START,
        registerInfo: registerInfo
    };
};

export const registerFail = error => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error: error
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");

        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );

            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const currentDate = new Date().getTime();
                const timeout = expirationDate.getTime() - currentDate;

                dispatch(
                    loginSuccess(JSON.parse(localStorage.getItem("userData")))
                );
                dispatch(checkOutTimeout(timeout / 1000));
            }
        }
    };
};

export const register = registerInfo => {
    return dispatch => {
        dispatch(registerStart(registerInfo));
        axios
            .post("auth/register", registerInfo)
            .then(response => {
                const expirationDate = new Date(
                    new Date().getTime() + response.data.expires_in * 1000
                );
                localStorage.setItem("token", response.data.access_token);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("userData", JSON.stringify(response.data));
                dispatch(loginSuccess(response.data));
                dispatch(checkOutTimeout(response.data.expires_in));
            })
            .catch(e => {
                dispatch(registerFail(e.response.data.error));
            });
    };
};

export const loginStart = loginInfo => {
    return {
        type: actionTypes.LOGIN_START,
        loginInfo: loginInfo
    };
};

export const loginFail = error => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userData");
    return {
        type: actionTypes.LOGOUT
    };
};

export const loginSuccess = data => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: data.access_token
    };
};

export const checkOutTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const login = loginInfo => {
    return dispatch => {
        dispatch(loginStart(loginInfo));
        axios
            .post("auth/login", loginInfo)
            .then(response => {
                const expirationDate = new Date(
                    new Date().getTime() + response.data.expires_in * 1000
                );
                localStorage.setItem("token", response.data.access_token);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("userData", JSON.stringify(response.data));
                dispatch(loginSuccess(response.data));
                dispatch(checkOutTimeout(response.data.expires_in));
            })
            .catch(e => {
                dispatch(loginFail(e.response.data.error));
            });
    };
};

// USERS
export const getUsersStart = () => {
    return {
        type: actionTypes.GET_USERS_START
    };
};

export const getUsersSuccess = users => {
    return {
        type: actionTypes.GET_USERS_SUCCESS,
        users: users
    };
};

export const getUsersFail = error => {
    return {
        type: actionTypes.GET_USERS_SUCCESS,
        error: error
    };
};

export const getUsers = () => {
    return dispatch => {
        dispatch(getUsersStart());
        axios
            .get("user/all")
            .then(response => {
                dispatch(getUsersSuccess(response.data.users));
            })
            .catch(error => {
                dispatch(getUsersFail(error));
            });
    };
};

