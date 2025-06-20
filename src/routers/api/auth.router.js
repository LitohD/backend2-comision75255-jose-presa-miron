import authController from "../../controllers/auth.controller.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import RouterHelper from "../../helpers/router.helper.js";

class AuthRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.render("/register", ["PUBLIC"], (req, res) => {res.render("register");});
        this.create( "/register", ["PUBLIC"], passportCb("register"), authController.registerCb);
        this.create( "/login", ["PUBLIC"], passportCb("login"), authController.loginCb);
        this.create("/signout", ["USER", "ADMIN"], authController.signoutCb);
        this.create("/online", ["USER", "ADMIN"], authController.onlineCb);
        this.read( "/google", ["PUBLIC"], passportCb("google", { scope: ["email", "profile"] }));
        this.read("/google/redirect", ["PUBLIC"], passportCb("google"), authController.loginCb);
        this.read("/bad-auth", ["PUBLIC"], authController.badAuthCb);
        this.read("/forbidden", ["PUBLIC"], authController.forbiddenCb);
        this.read("/verify/:email/:verifyCode", ["PUBLIC"], authController.verifyUserCb);
        this.create("/recover", ["PUBLIC"], authController.recoverCb);
        this.create("/reset", ["PUBLIC"], authController.resetCb);
    };
}

const authRouter = new AuthRouter().getRouter();
export default authRouter;