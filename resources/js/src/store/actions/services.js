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
                let errorMessage = "Service name is taken!";
                dispatch(addServiceFail(errorMessage));
            });
    };
};

export const getServicesStart = () => {
    return {
        type: actionTypes.GET_SERVICES_START
    };
};

export const getServicesSuccess = services => {
    return {
        type: actionTypes.GET_SERVICES_SUCCESS,
        services: services
    };
};

export const getServicesFail = error => {
    return {
        type: actionTypes.GET_SERVICES_FAIL,
        error: error
    };
};

export const getServices = () => {
    return dispatch => {
        dispatch(getServicesStart());
        axios
            .get("service/all")
            .then(response => {
                console.log(response.data.services);
                dispatch(getServicesSuccess(response.data.services));
            })
            .catch(error => {
                console.log(error);
                dispatch(getServicesFail(error));
            });
    };
};