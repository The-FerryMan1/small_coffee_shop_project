import { useAxios } from "@/axios/useAxios";
import { useToast } from "@nuxt/ui/runtime/composables/useToast.js";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useProductStore =defineStore("prduct", ()=>{
    const products = ref()


    const toast = useToast()
    const createProduct = async(prdct:any)=>{
        try {
            const {data} = await useAxios.post("/auth/product", prdct)
            toast.add({description:"tang ina mo", title:"puking ina mo"})
        } catch (error) {
            
        }
    }

    return {
    createProduct,
    }
})