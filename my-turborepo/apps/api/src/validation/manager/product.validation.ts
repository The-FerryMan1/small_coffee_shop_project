import z from "zod";

export const createProductValidation = z.object({
    name: z.string().max(255),
    category: z.string().max(255),
    description: z.string().max(255),
    stock: z.number().min(1).nonnegative(),
    price: z.number().min(1).nonnegative()

})
