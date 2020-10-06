import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import Test from "./Test";
import "../../css/App.css";
import { Button } from "antd";

function App() {
    return (
        <div className="container">
            <h1>App</h1>
            <Button type="primary">Button</Button>
            <Route path="/test" component={Test} />
        </div>
    );
}

export default App;

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

if (document.getElementById("root")) {
    ReactDOM.render(app, document.getElementById("root"));
}
