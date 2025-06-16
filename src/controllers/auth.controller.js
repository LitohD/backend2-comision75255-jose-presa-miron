import emailService from "../services/emailService.js";
import { usersService } from "../services/service.js";
import { createHash } from "../helpers/hash.helper.js";


class AuthController {
    registerCb = async (req, res, next) => {
        const { _id } = req.user;
        res.json201(_id, "Registered");
    };
    loginCb = async (req, res, next) => {
        const opts = { maxAge: 7 * 24 * 60 * 60 * 1000 };
        const { _id } = req.user;
        res.cookie("token", req.user.token, opts).json200(_id, "Logged in");
    };
    signoutCb = async (req, res, next) => {
        const { _id } = req;
        res.clearCookie("token").json200(_id, "Signout Ok");
    };
    onlineCb = async (req, res, next) => {
        const payload = {
            name: req.user.name,
            email: req.user.email
        }
        console.log(payload);
        res.json200(payload, "Is Online");
    };
    badAuthCb = async (req, res, next) => {
        res.json401();
    };
    forbiddenCb = async (req, res, next) => {
        res.json403();
    };
    googleCb = async (req, res, next) => {
        res.json403();
    };
    verifyUserCb = async (req, res, next) => {
        const { email, verifyCode } = req.params;
        const user = await usersService.readBy({ email, verifyCode });
        if (!user) {
            return res.json404();
        }
        await usersService.updateById(user._id, { isVerified: true });
        res.json200(user, "verified!");
    };
    recoverCb = async (req, res, next) => {

        const { email } = req.body;
        console.log("body recovery");
        console.log(req.body);
        if (!email) {
            return res.json203("need email");
        }
        const user = await usersService.readBy({ email });
        if (!user) {
            return res.json404("There is no account with that email");
        }
        await emailService.sendRecoveryEmail(user.email);
        res.json200();
    };
    resetCb = async (req, res, next) => {
        const { email, password } = req.body;

        const user = await usersService.readBy({ email });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const hashedPassword = createHash(password);
        await usersService.updateById(user._id, { password: hashedPassword })

        res.json200();
    };
}

const authController = new AuthController();
export default authController;