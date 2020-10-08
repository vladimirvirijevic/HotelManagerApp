import * as actionTypes from "../actions/actionTypes";

const initialState = {
    services: [],
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_SERVICE_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ADD_SERVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                services: state.services.concat(action.service)
            };
        case actionTypes.ADD_SERVICE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.GET_SERVICES_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_SERVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                services: action.services
            };
        case actionTypes.GET_SERVICES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default reducer;
