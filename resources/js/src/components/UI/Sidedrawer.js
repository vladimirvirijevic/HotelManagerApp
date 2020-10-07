import React from "react";
import { NavLink } from "react-router-dom";

const Sidedrawer = props => {
    let drawerClasses = "side-drawer";

    if (props.show) {
        drawerClasses = "side-drawer open";
    }

    return (
        <div className={drawerClasses}>
            <div className="sidenav__items">
                <NavLink
                    className="sidenav__item"
                    to="/bookings"
                    exact
                    activeClassName="active-link"
                >
                    <p className="drawer-text">Bookings</p>
                </NavLink>
                <NavLink
                    className="sidenav__item"
                    to="/settings"
                    exact
                    activeClassName="active-link"
                >
                    <p className="drawer-text">Settings</p>
                </NavLink>
                <NavLink
                    className="sidenav__item"
                    to="/logout"
                    exact
                    activeClassName="active-link"
                >
                    <p className="drawer-text">Logout</p>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidedrawer;
