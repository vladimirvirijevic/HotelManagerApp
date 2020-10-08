import * as actionTypes from "../actions/actionTypes";

const initialState = {
    clients: [],
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_CLIENT_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ADD_CLIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                clients: state.clients.concat(action.client)
            };
        case actionTypes.ADD_CLIENT_FAIL:
            console.log(action.error);
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
