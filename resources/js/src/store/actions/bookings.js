import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const addBookingStart = () => {
    return {
        type: actionTypes.ADD_BOOKING_START
    };
};

export const addBookingSuccess = booking => {
    return {
        type: actionTypes.ADD_BOOKING_SUCCESS,
        client: booking
    };
};

export const addBookingFail = error => {
    return {
        type: actionTypes.ADD_BOOKING_FAIL,
        error: error
    };
};

export const addBooking = booking => {
    return dispatch => {
        dispatch(addBookingStart());
        axios
            .post("booking/store", booking)
            .then(response => {
                dispatch(addBookingSuccess(response.data.booking));
            })
            .catch(e => {
                console.log(e);
                let errorMessage = "There was an error!";
                dispatch(addBookingFail(errorMessage));
            });
    };
};
