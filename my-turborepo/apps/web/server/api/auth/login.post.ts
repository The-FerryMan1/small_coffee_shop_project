export default defineEventHandler(async(e)=>{
    try {
        const form = await readBody(e)
        const response = await $fetch.raw("http://localhost:3000/api/v1/login", {
            method: "POST",
            body: form,
            credentials: "include"
        })

        const setCookie = response.headers.get("set-cookie")
        if(!setCookie) throw new Error("Authentication failed")

        return {message: "login success", status: "success"}
    } catch (error) {
        if(error instanceof Error){
            e.node.res.statusCode = 401
            return {status: "error", message: error.message}
        }
        e.node.res.statusCode = 500
        return {status: "error", message: "[client] internal service error"}
    }
})