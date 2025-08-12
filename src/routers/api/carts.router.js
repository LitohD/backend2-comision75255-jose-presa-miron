import RouterHelper from "../../helpers/router.helper.js";
import cartsController from "../../controllers/cart.controller.js"

class CartsRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };
    init = () => {
        this.create("/:id", ["USER", "ADMIN"], cartsController.createOne);
        this.read("/:id", ["USER", "ADMIN"], cartsController.readById);
        this.read("/", ["USER", "ADMIN"], cartsController.readBy);
        this.read("/all", ["USER", "ADMIN"], cartsController.readAll);
    }
}

const cartsRouter = (new CartsRouter()).getRouter();
export default cartsRouter;