import React, { useEffect } from "react";
import { Tabs } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import Rooms from "../../components/Rooms";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Clients from "../../components/Clients";
import Services from "../../components/Services";
import Departments from "../../components/Departments";

const { TabPane } = Tabs;

const Settings = props => {
    useEffect(() => {
        props.onGetRooms();
        props.onGetClients();
        props.onGetServices();
    }, []);

    const addDepartment = department => {
        console.log(department);
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
                    <Services
                        error={props.serviceError}
                        services={props.services}
                        addService={props.onAddService}
                    />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <AndroidOutlined />
                            Departments
                        </span>
                    }
                    key="4"
                >
                    <Departments
                        error={props.departmentError}
                        departments={props.departments}
                        addDepartment={props.onAddDepartment}
                    />
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
        clients: state.clients.clients,
        services: state.services.services,
        serviceError: state.services.error,
        departments: state.departments.departments,
        departmentError: state.departments.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddRoom: room => dispatch(actions.addRoom(room)),
        onGetRooms: () => dispatch(actions.getRooms()),
        onAddClient: client => dispatch(actions.addClient(client)),
        onGetClients: () => dispatch(actions.getClients()),
        onAddService: service => dispatch(actions.addService(service)),
        onGetServices: () => dispatch(actions.getServices()),
        onAddDepartment: department => dispatch(actions.addDepartment(department)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
