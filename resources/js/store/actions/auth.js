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

export const register = registerInfo => {
    return dispatch => {
        dispatch(registerStart(registerInfo));
        console.log(registerInfo);
        axios
            .post("auth/register", registerInfo)
            .then(response => {
                console.log(response);
                const expirationDate = new Date(
                    new Date().getTime() + response.data.expires_in * 1000
                );
                localStorage.setItem("token", response.data.access_token);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("userData", response.data);
                dispatch(loginSuccess(response.data));
                dispatch(checkOutTimeout(response.data.expires_in));
            })
            .catch(e => {
                console.log(e.response.data.error);
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
        console.log(expirationTime);
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
                console.log(response);
                const expirationDate = new Date(
                    new Date().getTime() + response.data.expires_in * 1000
                );
                localStorage.setItem("token", response.data.access_token);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("userData", response.data);
                dispatch(loginSuccess(response.data));
                dispatch(checkOutTimeout(response.data.expires_in));
            })
            .catch(e => {
                dispatch(loginFail(e.response.data.error));
            });
    };
};
