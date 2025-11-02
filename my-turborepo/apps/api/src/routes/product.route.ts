import { Hono } from "hono";
import { createProductHandler } from "../handler/manager/product.handler";

const productRoute = new Hono()

productRoute.post("/auth/product", ...createProductHandler)

export default productRoute