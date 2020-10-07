import React from "react";
import { NavLink } from "react-router-dom";

const Layout = props => {
    return (
        <>
            <div className="sidenav">
                <h2 className="sidenav__title">Hotel Manager</h2>
                <div className="sidenav__items">
                    <NavLink
                        className="sidenav__item"
                        to="/"
                        exact
                        activeClassName="active-link"
                    >
                        <i className="fas fa-calendar-alt sidenav__icon"></i>
                        Bookings
                    </NavLink>
                    <NavLink
                        className="sidenav__item"
                        to="/settings"
                        exact
                        activeClassName="active-link"
                    >
                        <i className="fas fa-cog sidenav__icon"></i> Settings
                    </NavLink>
                    <NavLink
                        className="sidenav__item"
                        to="/logout"
                        exact
                        activeClassName="active-link"
                    >
                        <i className="fas fa-sign-out-alt sidenav__icon"></i>
                        Logout
                    </NavLink>
                </div>
            </div>
            <div className="content">
                <div className="content__topbar"></div>
                <div className="content__main">{props.children}</div>
            </div>
        </>
    );
};

export default Layout;
