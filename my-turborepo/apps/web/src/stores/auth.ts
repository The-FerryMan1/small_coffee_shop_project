import { useAxios } from "@/axios/useAxios"
import { AxiosError } from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useRouter } from "vue-router"

export const useAuthStore = defineStore("auth", () => {
    const isAuthenticated = ref<boolean>(false)
    const user = ref<{} | null>(null)

    const router = useRouter()


    const getUser = async () => {
        try {
            const { data, status } = await useAxios.get("/auth/test", {
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
            router.replace({ name: "dashboard" })
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
            router.replace({ name: "login" })
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
            router.replace({name:"login"})
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