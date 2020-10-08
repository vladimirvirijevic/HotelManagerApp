import axios from "axios";
// const config = {
//     headers: { Authorization: `Bearer ${token}` }
// };

const instance = axios.create({
    baseURL: "http://app.hotel1pro.com/api",
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
