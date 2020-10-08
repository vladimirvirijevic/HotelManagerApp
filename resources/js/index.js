import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import authReducer from "./src/store/reducers/auth";
import roomsReducer from "./src/store/reducers/rooms";
import clientsReducer from "./src/store/reducers/clients";
import servicesReducer from "./src/store/reducers/services";
import App from "./src/containers/App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    rooms: roomsReducer,
    clients: clientsReducer,
    services: servicesReducer
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
