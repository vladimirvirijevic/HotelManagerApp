import * as actionTypes from "../actions/actionTypes";

const initialState = {
    departments: [],
    loading: false,
    error: null,
    success: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_DEPARTMENT_START:
            return {
                ...state,
                loading: true,
                success: false
            };
        case actionTypes.ADD_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                departments: state.departments.concat(action.department),
                success: true
            };
        case actionTypes.ADD_DEPARTMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
                success: false
            };
        case actionTypes.GET_DEPARTMENTS_START:
            return {
                ...state,
                loading: true,
                success: false
            };
        case actionTypes.GET_DEPARTMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                departments: action.departments,
                success: false
            };
        case actionTypes.GET_DEPARTMENTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
                success: false
            };
        case actionTypes.CLEAR_DEPARTMENTS_MESSAGE:
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
