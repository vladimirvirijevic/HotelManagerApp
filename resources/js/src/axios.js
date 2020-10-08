import axios from "axios";
// const config = {
//     headers: { Authorization: `Bearer ${token}` }
// };

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// Set the AUTH token for any request
instance.interceptors.request.use(function(config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

export default instance;
