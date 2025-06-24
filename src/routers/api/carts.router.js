import RouterHelper from "../../helpers/router.helper.js";
import cartController from "../../controllers/cart.controller.js";

class CartsRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.create("/", ["USER", "ADMIN"], cartController.createOne);
    }
}

const cartsRouter = new CartsRouter().getRouter();
export default cartsRouter;