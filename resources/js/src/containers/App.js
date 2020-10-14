import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { connect } from "react-redux";
import Layout from "../components/UI/Layout";
import GuardedRoute from "../components/Shared/GuardedRoute";
import * as actions from "../store/actions/index";
import Bookings from "./Bookings";
import Settings from "./Settings/Settings";
import Logout from "./Auth/Logout";
import WasteManagment from "./WasteManagment";
import Tickets from "./Tickets";
import CreateTicket from "../components/CreateTicket";

const App = props => {
    useEffect(() => {
        props.onTryAutoSingup();
    }, []);

    let routes = (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Layout>
                <GuardedRoute
                    path="/bookings"
                    component={Bookings}
                    exact
                    auth={props.isAuth}
                />
                <GuardedRoute
                    path="/tickets"
                    component={Tickets}
                    exact
                    auth={props.isAuth}
                />
                <GuardedRoute
                    path="/tickets/create"
                    component={CreateTicket}
                    exact
                    auth={props.isAuth}
                />
                <GuardedRoute
                    path="/waste"
                    component={WasteManagment}
                    exact
                    auth={props.isAuth}
                />
                <GuardedRoute
                    path="/settings"
                    component={Settings}
                    exact
                    auth={props.isAuth}
                />
                <GuardedRoute
                    path="/logout"
                    component={Logout}
                    auth={props.isAuth}
                />
            </Layout>
        </Switch>
    );

    return <div className="container">{routes}</div>;
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSingup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
