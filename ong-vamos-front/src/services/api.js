import axios from "axios";

const api = axios.create({
  baseURL: "https://ong-vamos.herokuapp.com/api/v1",
});

export default api;
