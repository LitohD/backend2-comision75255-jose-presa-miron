import { cartsService } from "../services/service.js";

class CartController {
    createOne = async (req, res, next) => {
        try {
            const data = req.body;
            const response = await cartsService.createOne(data);
            res.status(201).json({ response, message: "Cart created" });
        } catch (error) {
            next(error);
        }
    }
}

export default new CartController();