import { useAxios } from "@/axios/useAxios";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";


type User = {
    id: number,
    firstName: string,
    lastName: string,
    middleName: string,
    email: string, 
    createdAt: string,
    updatedAt:string | null,
}

export const useUserStore = defineStore('user', () => {
    const userInfo = ref<User | null>(null)


    const getUserInfo = async () => {
        try {
            const { data, status } = await useAxios.get('/auth/user')
            if (status !== 200) throw new Error("Unable to get the information")
            userInfo.value = data
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data?.error)
                throw new Error(error.response?.data?.error)
            }
            console.log(error)
            throw error
        }
    }

    return {
        userInfo,
        getUserInfo
    }
})