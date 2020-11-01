import * as actionTypes from './actionTypes';
import axios from "../../axios";

export const changeNameSuccess = user => {
    return {
        type: actionTypes.CHANGE_NAME_SUCCESS,
        user: user
    };
};

export const changeNameFail = error => {
    return {
        type: actionTypes.CHANGE_NAME_FAIL,
        error: error
    };
};

export const changeName = (user) => {
    return dispatch => {
        axios.put(`user/changeUsername/${user.id}`, user)
            .then(response => {
                console.log(response.data);
                dispatch(changeNameSuccess(response.data.user));
            })
            .catch(error => {
                let errorMessage = "Cant change username!";
                dispatch(changeNameFail(errorMessage));
            })
    }
}

export const getProfileInfoSuccess = user => {
    return {
        type: actionTypes.GET_PROFILE_INFO_SUCCESS,
        user: user
    };
};

export const getProfileInfo = () => {
    return dispatch => {
        axios.get('user/info/')
            .then(response => {
                dispatch(getProfileInfoSuccess(response.data.user));
            })
            .catch(error => {
                console.log(error);
            })
    }
};