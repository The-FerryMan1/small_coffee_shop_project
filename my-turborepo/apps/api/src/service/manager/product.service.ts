import { Context } from "hono";
import { createProductValidation } from "../../validation/manager/product.validation";
import z from "zod";
import { db } from "../../database";
import { productTable } from "../../database/schema";
import { HTTPException } from "hono/http-exception";

type ProductType = z.infer<typeof createProductValidation>

export const createProductService = async (c: Context, data: ProductType) => {
    try {
        const [newProduct] = await db.insert(productTable).values(data).returning()
        return newProduct
    } catch (error) {
        if (error instanceof HTTPException) {
            throw new HTTPException(error.status, { message: error.message })
        }

        throw new HTTPException(500, { message: "Internal service error" })
    }
}