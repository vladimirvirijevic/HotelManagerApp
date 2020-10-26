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
        default:
            return state;
    }
};

export default reducer;
