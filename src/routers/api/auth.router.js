import { Router } from "express";
import passport from "../../middlewares/passport.mid.js"

const authRouter = Router();

const registerCb = async (req, res, next) => {
    try {
        const { method, originalUrl: url } = req;
        const { _id } = req.user
        return res.status(201).json({ message: "Registered", response: _id, method, url });
    } catch (error) {
        next(error);
    }
};

const loginCb = async (req, res, next) => {
    try {
        const { method, originalUrl: url } = req;
        const { _id } = req.user
        return res
            .status(200)
            .cookie("token", req.user.token, { maxAge: 30 * 24 * 60 * 60 * 1000 })
            .json({ message: "Logged in", response: _id, method, url });
    } catch (error) {
        next(error);
    }
};

const signoutCb = (req, res, next) => {
    try {
        const { method, originalUrl: url } = req;
        return res.status(200).clearCookie("token").json({
            message: "sign out",
            method,
            url,
        })
    } catch (error) {
        next(error)
    }
};

const onlineCb = async (req, res, next) => {
    try {
        const { method, originalUrl: url } = req;
        const { _id } = req.user
        return res
            .status(200)
            .cookie("token", req.user.token, { maxAge: 30 * 24 * 60 * 60 * 1000 })
            .json({ message: "Is online", response: _id, method, url });
    } catch (error) {
        next(error);
    }
};

const badAuth = (req, res, next) => {
    try {
        const error = new Error("bad-auth");
        error.statusCode = 401;
        throw error;
    } catch (error) {
        next(error)
    }
};
    const forbidden = (req, res, next) => {
        try {
            const error = new Error("forbidden");
            error.statusCode = 403;
            throw error;
        } catch (error) {
            next(error)
        }
};

const optsBad = { session: false, failureRedirect: "/api/auth/bad-auth" };
const optsForbidden = { session: false, failureRedirect: "/api/auth/forbidden" };


authRouter.post("/register", passport.authenticate("register", optsBad), registerCb);
authRouter.post("/login", passport.authenticate("login", optsBad), loginCb);
authRouter.post("/signout", passport.authenticate("user", optsForbidden), signoutCb);
authRouter.post("/online", passport.authenticate("online", optsForbidden), onlineCb);
authRouter.get("/bad-auth", badAuth);
authRouter.get("/forbidden", forbidden);

export default authRouter;