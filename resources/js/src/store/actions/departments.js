import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const addDepartmentStart = () => {
    return {
        type: actionTypes.ADD_DEPARTMENT_START
    };
};

export const addDepartmentSuccess = department => {
    return {
        type: actionTypes.ADD_DEPARTMENT_SUCCESS,
        department: department
    };
};

export const addDepartmentFail = error => {
    return {
        type: actionTypes.ADD_DEPARTMENT_FAIL,
        error: error
    };
};

export const addDepartment = department => {
    return dispatch => {
        dispatch(addDepartmentStart());
        axios
            .post("department/store", department)
            .then(response => {
                dispatch(addDepartmentSuccess(response.data.department));
            })
            .catch(e => {
                let errorMessage = "Department already exists!";
                dispatch(addDepartmentFail(errorMessage));
            });
    };
};

export const getDepartmentsStart = () => {
    return {
        type: actionTypes.GET_DEPARTMENTS_START
    };
};

export const getDepartmentsSuccess = departments => {
    return {
        type: actionTypes.GET_DEPARTMENTS_SUCCESS,
        departments: departments
    };
};

export const getDepartmentsFail = error => {
    return {
        type: actionTypes.GET_DEPARTMENTS_FAIL,
        error: error
    };
};

export const getDepartments = () => {
    return dispatch => {
        dispatch(getDepartmentsStart());
        axios
            .get("department/all")
            .then(response => {
                dispatch(getDepartmentsSuccess(response.data.departments));
            })
            .catch(error => {
                dispatch(getDepartmentsFail(error));
            });
    };
};

export const clearDepartmentsMessage = () => {
    return {
        type: actionTypes.CLEAR_DEPARTMENTS_MESSAGE
    };
};


