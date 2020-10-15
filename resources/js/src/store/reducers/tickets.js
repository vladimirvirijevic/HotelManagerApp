import * as actionTypes from "../actions/actionTypes";

const initialState = {
    tickets: [],
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TICKET_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ADD_TICKET_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                tickets: state.tickets.concat(action.ticket)
            };
        case actionTypes.ADD_TICKET_FAIL:
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
