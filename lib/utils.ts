import axios from "axios"

export const API_USER = axios.create({
    baseURL: "http://localhost:8001/",
    withCredentials: true
})

export const API_SHORTER = axios.create({
    baseURL: "http://localhost:8002/",
    withCredentials: true
})