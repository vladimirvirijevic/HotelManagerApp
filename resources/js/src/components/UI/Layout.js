import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Sidedrawer from "./Sidedrawer";
import { Button } from "antd";
import { BarsOutlined } from "@ant-design/icons";

const Layout = props => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const drawerToggleClickHandler = () => {
        setOpenDrawer(!openDrawer);
    };

    return (
        <>
            <Sidedrawer show={openDrawer} />
            <div className="sidenav">
                {/* <h2 className="sidenav__title">Hotel Manager</h2> */}
                <div className="sidenav__items">
                    <NavLink
                        className="sidenav__item"
                        to="/bookings"
                        exact
                        activeClassName="active-link"
                    >
                        <i className="fas fa-calendar-alt sidenav__icon"></i>
                        <p className="sidenav__item__text">Bookings</p>
                    </NavLink>
                    <NavLink
                        className="sidenav__item"
                        to="/tickets"
                        activeClassName="active-link"
                    >
                        <i className="fas fa-clipboard-list sidenav__icon"></i>{" "}
                        <p className="sidenav__item__text">Tickets</p>
                    </NavLink>
                    <NavLink
                        className="sidenav__item"
                        to="/waste"
                        exact
                        activeClassName="active-link"
                    >
                        <i className="fas fa-trash sidenav__icon"></i>{" "}
                        <p className="sidenav__item__text">Waste</p>
                    </NavLink>
                    <NavLink
                        className="sidenav__item"
                        to="/settings"
                        activeClassName="active-link"
                    >
                        <i className="fas fa-cog sidenav__icon"></i>{" "}
                        <p className="sidenav__item__text">Settings</p>
                    </NavLink>
                    <NavLink
                        className="sidenav__item"
                        to="/logout"
                        exact
                        activeClassName="active-link"
                    >
                        <i className="fas fa-sign-out-alt sidenav__icon"></i>
                        <p className="sidenav__item__text">Logout</p>
                    </NavLink>
                </div>
            </div>
            <div className="content">
                <div className="content__topbar">
                    <Button
                        onClick={drawerToggleClickHandler}
                        className="content__topbar__drawer"
                        type="primary"
                        shape="circle"
                        icon={<BarsOutlined />}
                    />
                    <h2>Hotel Manager</h2>
                </div>
                <div className="content__main">{props.children}</div>
            </div>
        </>
    );
};

export default Layout;
