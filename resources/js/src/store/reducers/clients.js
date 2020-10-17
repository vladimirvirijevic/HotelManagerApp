import * as actionTypes from "../actions/actionTypes";

const initialState = {
    clients: [],
    loading: false,
    error: null,
    success: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_CLIENT_START:
            return {
                ...state,
                loading: true,
                success: false
            };
        case actionTypes.ADD_CLIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                clients: state.clients.concat(action.client),
                success: true
            };
        case actionTypes.ADD_CLIENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
                success: false
            };
        case actionTypes.GET_CLIENTS_START:
            return {
                ...state,
                loading: true,
                success: false
            };
        case actionTypes.GET_CLIENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                clients: action.clients,
                success: false
            };
        case actionTypes.GET_CLIENTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
                success: false
            };
        case actionTypes.CLEAR_CLIENTS_MESSAGE:
            return {
                ...state,
                loading: false,
                error: null,
                success: false
            };
        default:
            return state;
    }
};

export default reducer;
