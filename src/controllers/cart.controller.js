import { cartsService } from "../services/service.js";

class CartController {
    createOne = async (req, res, next) => {
        const response = await cartsService.createOne(dat)
    }
}