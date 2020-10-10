import * as actionTypes from "../actions/actionTypes";

const initialState = {
    departments: [],
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_DEPARTMENT_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ADD_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                departments: state.departments.concat(action.department)
            };
        case actionTypes.ADD_DEPARTMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.GET_DEPARTMENTS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_DEPARTMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                departments: action.departments
            };
        case actionTypes.GET_DEPARTMENTS_FAIL:
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
