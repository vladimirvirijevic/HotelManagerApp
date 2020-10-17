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
import bookingsReducer from "./src/store/reducers/bookings";
import departmentsReducer from "./src/store/reducers/departments";
import articlesReducer from "./src/store/reducers/articles";
import ticketsReducer from "./src/store/reducers/tickets";
import App from "./src/App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    rooms: roomsReducer,
    clients: clientsReducer,
    services: servicesReducer,
    bookings: bookingsReducer,
    departments: departmentsReducer,
    articles: articlesReducer,
    tickets: ticketsReducer
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

const app = (
    <Provider store={store}>
        <BrowserRouter basename="/hotelmanagerapp/public">
            <App />
        </BrowserRouter>
    </Provider>
);

if (document.getElementById("root")) {
    ReactDOM.render(app, document.getElementById("root"));
}
