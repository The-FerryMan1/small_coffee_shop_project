import z from "zod"

export const registerValidator = z.object({

    first_name: z.string("First name is required").max(255),


    last_name: z.string("Last name is required").max(255),


    middle_name: z.string().max(255).optional().default("N/A"),


    email: z.email("Enter a valid email"),


    password: z.string().min(8, "Password must be atleast 8 characters"),


    confirm_password: z.string().min(8, "Password must be atleast 8 characters")


}).refine((data)=> data.password === data.confirm_password, {


    path: ["confirm_password"],


    error: "Password do not match"  


})