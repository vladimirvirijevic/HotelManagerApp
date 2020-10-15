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
                console.log(response.data);
                console.log("g");
            })
            .catch(error => {
                dispatch(getTicketsFail(error));
            });
    };
};
