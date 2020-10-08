import * as actionTypes from "../actions/actionTypes";

const initialState = {
    bookings: [],
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_BOOKING_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ADD_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                bookings: state.bookings.concat(action.booking)
            };
        case actionTypes.ADD_BOOKING_FAIL:
            console.log(action.error);
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
