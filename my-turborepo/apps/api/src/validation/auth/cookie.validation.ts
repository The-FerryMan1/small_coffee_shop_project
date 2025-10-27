import z from "zod"

export const validateCookie = z.object({
    refresh_token: z.string("Cookie is required")
})