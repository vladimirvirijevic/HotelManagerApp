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
        booking: booking
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

export const getBookingsStart = () => {
    return {
        type: actionTypes.GET_BOOKINGS_START
    };
};

export const getBookingsSuccess = bookings => {
    return {
        type: actionTypes.GET_BOOKINGS_SUCCESS,
        bookings: bookings
    };
};

export const getBookingsFail = error => {
    return {
        type: actionTypes.GET_BOOKINGS_FAIL,
        error: error
    };
};

export const getBookings = () => {
    return dispatch => {
        dispatch(getBookingsStart());
        axios
            .get("booking/all")
            .then(response => {
                console.log(response.data);
                dispatch(getBookingsSuccess(response.data.bookings));
            })
            .catch(error => {
                console.log(error);
                dispatch(getBookingsFail(error));
            });
    };
};
