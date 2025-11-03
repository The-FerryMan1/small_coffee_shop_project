import { useAxios } from "@/axios/useAxios"
import { AxiosError } from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"

type User = {
    id: number,
    firstName: string,
    lastName: string,
    email: string, 
    role: string
   
}

export const useAuthStore = defineStore("auth", () => {
    const isAuthenticated = ref<boolean>(false)
    const user = ref<User | null>(null)


    const getUser = async () => {
        try {
            const { data, status } = await useAxios.get("/auth/user", {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (status !== 200) throw new Error("Unauthorized")
            isAuthenticated.value = true
            user.value = data
        } catch (error) {
            isAuthenticated.value = false
            user.value = null
            if (error instanceof AxiosError) {
                console.log(error.response?.data?.error)
                throw new Error(error.response?.data?.error)
            }
            console.log(error)
            throw error
        }
    }

    const login = async <T>(payload: T) => {
        try {
            const { data, status } = await useAxios.post("/login", payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (status !== 200) throw new Error("Authentication failed")
            await getUser()
            return
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data?.error)
                throw new Error(error.response?.data?.error)
            }
            console.log(error)
            throw new Error("Registration failed")
        }
    }

    const register = async<T>(payload: T) => {

        try {
            const { data, status } = await useAxios.post("/register", payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (status !== 200) throw new Error("Registration failed")
            return
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data?.error)
                throw new Error(error.response?.data?.error)
            }
            console.log(error)
            throw new Error("Registration failed")
        }

    }

    const logout = async () => {
        try {
            await useAxios.post("/auth/logout", {})
        } catch (error) {

            if (error instanceof AxiosError) {
                console.log(error.response?.data?.error)
                throw new Error(error.response?.data?.error)
            }
            console.log(error)
            throw error
        } finally {
            isAuthenticated.value = false
            user.value = null
        }
    }



    return {
        isAuthenticated,
        user,
        login,
        register,
        getUser,
        logout
    }
})