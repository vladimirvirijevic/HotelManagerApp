import React, { useEffect } from "react";
import { Tabs } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import Rooms from "../../components/Rooms";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Clients from "../../components/Clients";
import Services from "../../components/Services";
import Departments from "../../components/Departments";
import Articles from "../../components/Articles";
import Units from "../../components/Units";

const { TabPane } = Tabs;

const Settings = props => {
    useEffect(() => {
        props.onGetRooms();
        props.onGetClients();
        props.onGetServices();
        props.onGetDepartments();
        props.onGetArticles();
        props.onGetUnits();
    }, []);

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
                <TabPane
                    tab={
                        <span>
                            <AndroidOutlined />
                            Articles
                        </span>
                    }
                    key="5"
                >
                    <Articles
                        error={props.articleError}
                        articles={props.articles}
                        addArticle={props.onAddArticle}
                    />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <AndroidOutlined />
                            Units
                        </span>
                    }
                    key="6"
                >
                    <Units
                        error={props.unitError}
                        units={props.units}
                        addUnit={props.onAddUnit}
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
        articles: state.articles.articles,
        articleError: state.articles.error,
        units: state.articles.units,
        unitError: state.articles.errorUnits
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
        onGetDepartments: () => dispatch(actions.getDepartments()),
        onAddArticle: article => dispatch(actions.addArticle(article)),
        onGetArticles: () => dispatch(actions.getArticles()),
        onAddUnit: unit => dispatch(actions.addUnit(unit)),
        onGetUnits: () => dispatch(actions.getUnits())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
