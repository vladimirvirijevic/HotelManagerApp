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
                console.log(response.data);
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

export const getRoomsStart = () => {
    return {
        type: actionTypes.GET_ROOMS_START
    };
};

export const getRoomsSuccess = rooms => {
    return {
        type: actionTypes.GET_ROOMS_SUCCESS,
        rooms: rooms
    };
};

export const getRoomsFail = error => {
    return {
        type: actionTypes.GET_ROOMS_SUCCESS,
        error: error
    };
};

export const getRooms = () => {
    return dispatch => {
        axios
            .get("room/all")
            .then(response => {
                dispatch(getRoomsSuccess(response.data.rooms));
            })
            .catch(error => {
                dispatch(getRoomsFail(error));
            });
    };
};
