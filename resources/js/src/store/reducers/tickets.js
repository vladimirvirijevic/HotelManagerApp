import * as actionTypes from "../actions/actionTypes";

const initialState = {
    tickets: [],
    loading: false,
    error: null,
    updateTicket: null,
    ticketUpdates: [],
    updateSuccess: false,
    success: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TICKET_START:
            return {
                ...state,
                loading: true,
                success: false
            };
        case actionTypes.ADD_TICKET_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                tickets: state.tickets.concat(action.ticket),
                success: true
            };
        case actionTypes.ADD_TICKET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
                success: false
            };
        case actionTypes.GET_TICKETS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_TICKETS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                tickets: action.tickets
            };
        case actionTypes.GET_TICKETS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.GET_TICKET_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                updateTicket: action.ticket
            };
        case actionTypes.GET_TICKET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.CLEAR_TICKET_MESSAGE:
            return {
                ...state,
                loading: false,
                error: null,
                updateSuccess: false,
                success: false
            };
        //TICKET UPDATES
        case actionTypes.ADD_TICKET_UPDATE_START:
            return {
                ...state,
                loading: true,
                success: false
            };
        case actionTypes.ADD_TICKET_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                ticketUpdates: state.ticketUpdates.concat(action.ticketUpdate),
                updateSuccess: true
            };
        case actionTypes.ADD_TICKET_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
                updateSuccess: false
            };
        case actionTypes.CLEAR_TICKET_MESSAGE:
            return {
                ...state,
                loading: false,
                error: null,
                updateSuccess: false,
                success: false
            };
        default:
            return state;
    }
};

export default reducer;
