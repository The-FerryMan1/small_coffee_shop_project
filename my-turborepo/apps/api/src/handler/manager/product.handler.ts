import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";
import { createProductValidation } from "../../validation/manager/product.validation";
import { errorHandler } from "../../error/error";
import { createProductService } from "../../service/manager/product.service";
import { HTTPException } from "hono/http-exception";
import { managerRoleCheck } from "../../middleware/manager.middleware";

const factory = createFactory()

export const createProductHandler = factory.createHandlers(
    managerRoleCheck,
    zValidator('json',createProductValidation),
    async(c)=>{
        const form = c.req.valid('json')
        try {
            const data = await createProductService(c, form)
            if(!data) throw new HTTPException(500, {message: "Failed to create a new product"})
            return c.json(data, 201)
        } catch (error) {
            return errorHandler(c, error)
        }
    }
)