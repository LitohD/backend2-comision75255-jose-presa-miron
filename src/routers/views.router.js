import { Router } from "express";
import { productsManager } from "../data/managers/mongo/manager.mongo.js";

const viewsRouter = Router();

const indexView = async (req, res) => {
    try {
        const products = await productsManager.readAll();

        if (!products || products === 0) {
            return res.status(200).render("index", { products: null, message: "No hay productos disponibles" });
        };
        res.status(200).render("index", { products });
    } catch (error) {
        res.status(error.statusCode || 500).render("error", { error });
    }
}
viewsRouter.get("/", indexView);

export default viewsRouter;