import * as actionTypes from "../actions/actionTypes";

const initialState = {
    services: [],
    loading: false,
    error: null,
    success: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_SERVICE_START:
            return {
                ...state,
                loading: true,
                success: false
            };
        case actionTypes.ADD_SERVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                services: state.services.concat(action.service),
                success: true
            };
        case actionTypes.ADD_SERVICE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
                success: false
            };
        case actionTypes.GET_SERVICES_START:
            return {
                ...state,
                loading: true,
                success: false
            };
        case actionTypes.GET_SERVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                services: action.services,
                success: false
            };
        case actionTypes.GET_SERVICES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
                success: false
            };
        case actionTypes.CLEAR_SERVICES_MESSAGE:
            return {
                ...state,
                loading: false,
                error: null,
                success: false,
            };
        case actionTypes.DELETE_SERVICE_SUCCESS:
            return {
                ...state,
                error: null,
                success: false,
                services: state.services.filter(service => service.id != action.service.id)
            };
        case actionTypes.DELETE_SERVICE_FAIL:
            return {
                ...state,
                error: action.error,
                success: false
            };
        default:
            return state;
    }
};

export default reducer;
