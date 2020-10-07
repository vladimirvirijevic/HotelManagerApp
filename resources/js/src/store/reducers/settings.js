import * as actionTypes from "../actions/actionTypes";

const initialState = {
    rooms: [],
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ROOM_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ADD_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                rooms: state.rooms.concat(action.room)
            };
        case actionTypes.ADD_ROOM_FAIL:
            console.log(action.error);
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.GET_ROOMS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_ROOMS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                rooms: action.rooms
            };
        case actionTypes.GET_ROOMS_FAIL:
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
