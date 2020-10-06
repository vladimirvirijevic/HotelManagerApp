import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import authReducer from "../store/reducers/auth";
import Test from "./Test";

const App = props => {
    let routes = (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/test" exact component={Test} />
        </Switch>
    );

    return <div className="container">{routes}</div>;
};

export default App;

// Redux store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    auth: authReducer
});
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

if (document.getElementById("root")) {
    ReactDOM.render(app, document.getElementById("root"));
}
