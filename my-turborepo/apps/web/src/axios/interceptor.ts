import axios from "axios";
import { useAxios } from "./useAxios";


const baseURL = "http://localhost:3000/api/v1"
let refresh = false
useAxios.interceptors.response.use((res) => res, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !refresh) {
        refresh = true
        const { status } = await useAxios.post(baseURL + "/refresh", {}, {
            withCredentials: true
        })

        if (status === 200) {
            return useAxios(originalRequest)
        }
    }
    refresh = false
    return error
})  