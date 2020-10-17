import React, { useEffect } from "react";
import { Alert } from "antd";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import RoomsList from "../../components/Settings/Rooms/RoomsList";
import RoomsCreate from "../../components/Settings/Rooms/RoomsCreate";

const Rooms = props => {
    useEffect(() => {
        props.onGetRooms();
    }, []);

    let alertMessage = null;

    const handleCloseAlert = () => {
        props.onClearRoomMessage();
    }

    if (props.success) {
        alertMessage = (
            <Alert
                closable
                onClose={handleCloseAlert}
                className="alert-message"
                message="Room Added Successfully"
                type="success"
            />
        );
    }
    else if (props.error) {
        alertMessage = (
            <Alert
                closable
                onClose={handleCloseAlert}
                className="alert-message"
                message={props.error}
                type="error"
            />
        );
    }

    return (
        <div>
            <RoomsCreate addRoom={props.onAddRoom} success={props.success} />
            {alertMessage}
            <RoomsList rooms={props.rooms}/>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        rooms: state.rooms.rooms,
        error: state.rooms.error,
        success: state.rooms.success
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetRooms: () => dispatch(actions.getRooms()),
        onAddRoom: room => dispatch(actions.addRoom(room)),
        onClearRoomMessage: () => dispatch(actions.clearRoomMessage())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
