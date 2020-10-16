import * as actionTypes from "../actions/actionTypes";

const initialState = {
    error: null,
    token: null,
    loading: false,
    users: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.LOGIN_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token,
                error: null,
                loading: false
            };
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actionTypes.GET_USERS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                users: action.users
            };
        case actionTypes.GET_USERS_FAIL:
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
