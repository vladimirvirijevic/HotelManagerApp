import * as actionTypes from "../actions/actionTypes";

const initialState = {
    bookings: [],
    loading: false,
    error: null,
    success: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_BOOKING_START:
            return {
                ...state,
                loading: true,
                success: false
            };
        case actionTypes.ADD_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                bookings: state.bookings.concat(action.booking),
                success: true
            };
        case actionTypes.ADD_BOOKING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
                success: false
            };
        case actionTypes.GET_BOOKINGS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_BOOKINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                bookings: action.bookings
            };
        case actionTypes.GET_BOOKINGS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.DELETE_BOOKING_SUCCESS:
            return {
                ...state,
                error: null,
                success: false,
                bookings: state.bookings.filter(booking => booking.id != action.booking.id)
            };
        case actionTypes.DELETE_BOOKING_FAIL:
            return {
                ...state,
                error: action.error,
                success: false
            };
        case actionTypes.UPDATE_BOOKING_SUCCESS:
            const bookingIndex = state.bookings.findIndex(booking => booking.id == action.booking.id);
            let updatedBookings = state.bookings;
            updatedBookings[bookingIndex] = action.booking;

            window.location.reload(false);

            return {
                ...state,
                error: null,
                bookings: updatedBookings
            };
        case actionTypes.UPDATE_BOOKING_FAIL:
            return {
                ...state
            };
        default:
            return state;
    }
};

export default reducer;
