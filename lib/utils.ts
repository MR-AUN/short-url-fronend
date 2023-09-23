import axios from "axios"

export const API_USER = axios.create({
    baseURL: "http://147.182.197.5:8001/",
    withCredentials: true,
})

export const API_SHORTER = axios.create({
    baseURL: "http://147.182.197.5:8001/",
    withCredentials: true
})

