import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const addServiceStart = () => {
    return {
        type: actionTypes.ADD_SERVICE_START
    };
};

export const addServiceSuccess = service => {
    return {
        type: actionTypes.ADD_SERVICE_SUCCESS,
        service: service
    };
};

export const addServiceFail = error => {
    return {
        type: actionTypes.ADD_SERVICE_FAIL,
        error: error
    };
};

export const addService = service => {
    return dispatch => {
        dispatch(addServiceStart());
        axios
            .post("service/store", service)
            .then(response => {
                dispatch(addServiceSuccess(response.data.service));
            })
            .catch(e => {
                console.log(e);
                let errorMessage = "There was an error!";
                dispatch(addServiceFail(errorMessage));
            });
    };
};
