import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const addTicketStart = () => {
    return {
        type: actionTypes.ADD_TICKET_START
    };
};

export const addTicketSuccess = ticket => {
    return {
        type: actionTypes.ADD_TICKET_SUCCESS,
        ticket: ticket
    };
};

export const addTicketFail = error => {
    return {
        type: actionTypes.ADD_TICKET_FAIL,
        error: error
    };
};

export const addTicket = ticket => {
    return dispatch => {
        dispatch(addTicketStart());
        axios
            .post("ticket/store", ticket)
            .then(response => {
                console.log(response.data);
                dispatch(addTicketSuccess(response.data.ticket));
            })
            .catch(e => {
                let errorMessage = "Ticket name is taken!";
                dispatch(addTicketFail(errorMessage));
            });
    };
};

export const getTicketsStart = () => {
    return {
        type: actionTypes.GET_TICKETS_START
    };
};

export const getTicketsSuccess = tickets => {
    return {
        type: actionTypes.GET_TICKETS_SUCCESS,
        tickets: tickets
    };
};

export const getTicketsFail = error => {
    return {
        type: actionTypes.GET_TICKETS_FAIL,
        error: error
    };
};

export const getTickets = () => {
    return dispatch => {
        dispatch(getTicketsStart());
        axios
            .get("ticket/all")
            .then(response => {
                dispatch(getTicketsSuccess(response.data.tickets));
            })
            .catch(error => {
                dispatch(getTicketsFail(error));
            });
    };
};

export const getTicketStart = () => {
    return {
        type: actionTypes.GET_TICKET_START
    };
};

export const getTicketSuccess = ticket => {
    return {
        type: actionTypes.GET_TICKET_SUCCESS,
        ticket: ticket
    };
};

export const getTicketFail = error => {
    return {
        type: actionTypes.GET_TICKET_FAIL,
        error: error
    };
};

export const getTicketById = (id) => {
    return dispatch => {
        dispatch(getTicketStart());
        axios
            .get(`ticket/${id}`)
            .then(response => {
                dispatch(getTicketSuccess(response.data.ticket));
                console.log(response.data.ticket);
            })
            .catch(error => {
                dispatch(getTicketFail(error));
            });
    };
};

// TICKET UPDATES
export const addTicketUpdateStart = () => {
    return {
        type: actionTypes.ADD_TICKET_UPDATE_START
    };
};

export const addTicketUpdateSuccess = ticketUpdate => {
    return {
        type: actionTypes.ADD_TICKET_UPDATE_SUCCESS,
        ticketUpdate: ticketUpdate
    };
};

export const addTicketUpdateFail = error => {
    return {
        type: actionTypes.ADD_TICKET_UPDATE_FAIL,
        error: error
    };
};

export const addTicketUpdate = ticketUpdate => {
    return dispatch => {
        dispatch(addTicketUpdateStart());
        axios
            .post("ticket/update", ticketUpdate)
            .then(response => {
                console.log(response.data);
                dispatch(addTicketUpdateSuccess(response.data.ticketUpdate));
            })
            .catch(e => {
                dispatch(addTicketFail(e.message));
            });
    };
};

