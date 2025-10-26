import z from "zod"

export const loginValidator = z.object({
    email: z.email("Invalid email"),
    password: z.string("password is required").min(8, "Password must be atleast 8 characters")
})