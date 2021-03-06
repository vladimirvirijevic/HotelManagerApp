import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const addRoomStart = () => {
    return {
        type: actionTypes.ADD_ROOM_START
    };
};

export const addRoomSuccess = room => {
    return {
        type: actionTypes.ADD_ROOM_SUCCESS,
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
                dispatch(addRoomSuccess(response.data.room));
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

export const clearRoomMessage = () => {
    return {
        type: actionTypes.CLEAR_ROOM_MESSAGE
    };
};

export const deleteRoomSuccess = (room) => {
    return {
        type: actionTypes.DELETE_ROOM_SUCCESS,
        room: room
    };
};

export const deleteRoomFail = (error) => {
    return {
        type: actionTypes.DELETE_ROOM_FAIL,
        error: error
    };
};

export const deleteRoom = (room) => {
    return dispatch => {
        axios
            .delete(`room/${room.id}`)
            .then(response => {
                console.log(response)
                dispatch(deleteRoomSuccess(room));
            })
            .catch(error => {
                const errorMessage = "This room has been booked. Delete booking first!";
                dispatch(deleteRoomFail(errorMessage));
            });
    }
}
