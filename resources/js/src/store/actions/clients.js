import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const addClientStart = () => {
    return {
        type: actionTypes.ADD_CLIENT_START
    };
};

export const addClientSuccess = room => {
    return {
        type: actionTypes.ADD_CLIENT_SUCCESS,
        room: room
    };
};

export const addClientFail = error => {
    return {
        type: actionTypes.ADD_CLIENT_FAIL,
        error: error
    };
};

export const addClient = client => {
    return dispatch => {
        dispatch(addClientStart());
        axios
            .post("client/store", client)
            .then(response => {
                dispatch(addClientSuccess(response.data.client));
            })
            .catch(e => {
                console.log(e);
                let errorMessage = "There was an error!";
                dispatch(addClientFail(errorMessage));
            });
    };
};
