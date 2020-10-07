import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const addRoomStart = () => {
    return {
        type: actionTypes.ADD_ROOM_START
    };
};

export const addRoomSuccess = room => {
    return {
        type: actionTypes.ADD_ROOM_START,
        room: room
    };
};

export const addRoomFail = error => {
    return {
        type: actionTypes.ADD_ROOM_FAIL,
        error: error
    };
};

export const addRoom = room => {
    return dispatch => {
        dispatch(addRoomStart());
        axios
            .post("room/store", room)
            .then(response => {
                console.log(response);
                dispatch(addRoomSuccess(response.data));
            })
            .catch(e => {
                let errorMessage = "There was an error!";
                if (e.response.data.message.name) {
                    errorMessage = e.response.data.message.name[0];
                }
                dispatch(addRoomFail(errorMessage));
            });
    };
};
