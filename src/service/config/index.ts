import { getDataFromCookie } from "@data-service";
import axios from "axios";

const request = axios.create({
    baseURL: "https://service.olimjanov.uz/v1"
})

request.interceptors.request.use((config)=>{
    const token = getDataFromCookie("token")
    if(token){
        config.headers["Authorization"] = token
    }
    return config
})

export default request