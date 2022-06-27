import axios from "axios";

const instance = axios.create({
    baseURL: "https://homedecor-mern.herokuapp.com",
});

export default instance;
