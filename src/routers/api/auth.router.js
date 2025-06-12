import authCcontroller from "../../controllers/auth.controller.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import RouterHelper from "../../helpers/router.helper.js";

class AuthRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.create(
            "/register",
            ["PUBLIC"],
            passportCb("register"),
            authCcontroller.registerCb
        );
        this.create(
            "/login",
            ["PUBLIC"],
            passportCb("login"),
            authCcontroller.loginCb
        );
        this.create("/signout", ["USER", "ADMIN"], authCcontroller.signoutCb);
        this.create("/online", ["USER", "ADMIN"], authCcontroller.onlineCb);
        this.read(
            "/google",
            ["PUBLIC"],
            passportCb("google", { scope: ["email", "profile"] })
        );
        this.read(
            "/google/redirect",
            ["PUBLIC"],
            passportCb("google"),
            authCcontroller.loginCb
        );
        this.read("/bad-auth", ["PUBLIC"], authCcontroller.badAuthCb);
        this.read("/forbidden", ["PUBLIC"], authCcontroller.forbiddenCb);
        this.read(
            "/verify/:email/:verifyCode",
            ["PUBLIC"],
            authCcontroller.verifyUserCb
        );
        this.create(
            "/recover",
            ["PUBLIC"],
            authCcontroller.recoverCb
        );
    };
}

const authRouter = new AuthRouter().getRouter();
export default authRouter;