import * as actionTypes from "../actions/actionTypes";

const initialState = {
    user: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PROFILE_INFO_SUCCESS:
            return {
                ...state,
                user: action.user,
                error: null
            }
        case actionTypes.CHANGE_NAME_SUCCESS:
            return {
                ...state,
                user: action.user,
                error: null
            }
        case actionTypes.CHANGE_NAME_FAIL:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
};

export default reducer;
