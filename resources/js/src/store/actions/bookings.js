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
                dispatch(addBookingFail(e.response.data.message));
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
                dispatch(getBookingsSuccess(response.data.bookings));
            })
            .catch(error => {
                dispatch(getBookingsFail(error));
            });
    };
};

export const deleteBookingSuccess = (booking) => {
    return {
        type: actionTypes.DELETE_BOOKING_SUCCESS,
        booking: booking
    };
};

export const deleteBookingFail = (error) => {
    return {
        type: actionTypes.DELETE_BOOKING_FAIL,
        error: error
    };
};

export const deleteBooking = (booking) => {
    return dispatch => {
        axios
            .delete(`booking/${booking.id}`)
            .then(response => {
                console.log(response)
                dispatch(deleteBookingSuccess(booking));
            })
            .catch(error => {
                const errorMessage = "Cant delete booking!";
                dispatch(deleteBookingFail(errorMessage));
            });
    }
}

export const updateBookingSuccess = (booking) => {
    return {
        type: actionTypes.UPDATE_BOOKING_SUCCESS,
        booking: booking
    };
};

export const updateBookingFail = (error) => {
    return {
        type: actionTypes.UPDATE_BOOKING_FAIL,
        error: error
    };
};

export const updateBooking = (bookingId, status) => {
    return dispatch => {
        axios
            .put(`booking/changeStatus/${bookingId}`, status)
            .then(response => {
                console.log(response)
                dispatch(updateBookingSuccess(response.data.booking));
            })
            .catch(error => {
                console.log(error);
                const errorMessage = "Cant update booking!";
                dispatch(updateBookingFail(errorMessage));
            });
    }
}
