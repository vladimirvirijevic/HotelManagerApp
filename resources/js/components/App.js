import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

const App = props => {
    let routes = (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Register} />
        </Switch>
    );

    return <div className="container">{routes}</div>;
};

export default App;

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

if (document.getElementById("root")) {
    ReactDOM.render(app, document.getElementById("root"));
}
