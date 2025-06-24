import viewsController from "../controllers/views.controller.js";
import passport from "../middlewares/passport.mid.js";
import RouterHelper from "../helpers/router.helper.js";

class ViewsRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.render("/", ["PUBLIC"], viewsController.indexView);
        this.render("/register", ["PUBLIC"], viewsController.registerView);
        this.render("/login", ["PUBLIC"], viewsController.loginView);
        this.render("/details/:pid", ["PUBLIC"], viewsController.detailView);
        this.render("/profile", ["USER", "ADMIN"], passport.authenticate("user", { session: false }), viewsController.profileView);
        this.render("/update-user", ["USER", "ADMIN"], viewsController.updateUSerView);
        this.render("/verify/:email", ["PUBLIC"], viewsController.verifyView);
        this.render("/reset/:email", ["PUBLIC"], viewsController.resetView);
        this.render("/recover", ["PUBLIC"], viewsController.forgotPasswordView);
        this.render("/cart", ["PUBLIC"], viewsController.cartView);
    };
}

const viewsRouter = new ViewsRouter().getRouter();
export default viewsRouter;