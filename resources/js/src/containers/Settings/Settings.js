import React, { useEffect } from "react";
import { Tabs } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import Rooms from "../../components/Rooms";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Clients from "../../components/Clients";

const { TabPane } = Tabs;

const Settings = props => {
    useEffect(() => {
        props.onGetRooms();
        props.onGetClients();
    }, []);

    const addClient = client => {
        console.log(client);
    };

    return (
        <div>
            <Tabs className="settings__tabs" defaultActiveKey="1">
                <TabPane
                    tab={
                        <span>
                            <AppleOutlined />
                            Rooms
                        </span>
                    }
                    key="1"
                >
                    <Rooms
                        error={props.roomError}
                        rooms={props.rooms}
                        addRoom={props.onAddRoom}
                    />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <AndroidOutlined />
                            Clients
                        </span>
                    }
                    key="2"
                >
                    <Clients
                        error={null}
                        clients={props.clients}
                        addClient={props.onAddClient}
                    />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <AndroidOutlined />
                            Services
                        </span>
                    }
                    key="3"
                >
                    Services
                </TabPane>
            </Tabs>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.rooms.loading,
        rooms: state.rooms.rooms,
        roomError: state.rooms.error,
        clients: state.clients.clients
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddRoom: room => dispatch(actions.addRoom(room)),
        onGetRooms: () => dispatch(actions.getRooms()),
        onAddClient: client => dispatch(actions.addClient(client)),
        onGetClients: () => dispatch(actions.getClients())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
