import React, { useState } from "react";
import { Tabs } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import Rooms from "../../components/Rooms/Rooms";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const { TabPane } = Tabs;

const Settings = props => {
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
                    <Rooms addRoom={props.onAddRoom} />
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
                    Clients
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
        loading: state.settings.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddRoom: room => dispatch(actions.addRoom(room))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
