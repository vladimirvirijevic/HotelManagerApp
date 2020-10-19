import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const addClientStart = () => {
    return {
        type: actionTypes.ADD_CLIENT_START
    };
};

export const addClientSuccess = client => {
    return {
        type: actionTypes.ADD_CLIENT_SUCCESS,
        client: client
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
                let errorMessage = "Client with the same name already exists!";
                dispatch(addClientFail(errorMessage));
            });
    };
};

export const getClientsStart = () => {
    return {
        type: actionTypes.GET_CLIENTS_START
    };
};

export const getClientsSuccess = clients => {
    return {
        type: actionTypes.GET_CLIENTS_SUCCESS,
        clients: clients
    };
};

export const getClientsFail = error => {
    return {
        type: actionTypes.GET_CLIENTS_SUCCESS,
        error: error
    };
};

export const getClients = () => {
    return dispatch => {
        dispatch(getClientsStart());
        axios
            .get("client/all")
            .then(response => {
                dispatch(getClientsSuccess(response.data.clients));
            })
            .catch(error => {
                dispatch(getClientsFail(error));
            });
    };
};

export const clearClientsMessage = () => {
    return {
        type: actionTypes.CLEAR_CLIENTS_MESSAGE
    };
};

export const deleteClientSuccess = (client) => {
    return {
        type: actionTypes.DELETE_CLIENT_SUCCESS,
        client: client
    };
};

export const deleteClientFail = (error) => {
    return {
        type: actionTypes.DELETE_CLIENT_FAIL,
        error: error
    };
};

export const deleteClient = (client) => {
    return dispatch => {
        axios
            .delete(`client/${client.id}`)
            .then(response => {
                console.log(response)
                dispatch(deleteClientSuccess(client));
            })
            .catch(error => {
                const errorMessage = "This client is included in booking!";
                dispatch(deleteClientFail(errorMessage));
            });
    }
}
