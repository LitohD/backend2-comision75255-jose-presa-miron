import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { usersManager } from "../data/managers/mongo/manager.mongo.js";
import { createHash, compareHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";

passport.use(
    "register",
    new localStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                if (!req.body.city) {
                    const error = new Error("Invalid data");
                    error.statusCode = 400;
                    throw error;
                }
                let user = await usersManager.readBy({ email });
                if (user) {
                    const error = new Error("Invalid credentials");
                    error.statusCode = 401;
                    throw error;
                }
                req.body.password = createHash(password);
                user = await usersManager.createOne(req.body);
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.use(
    "login",
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            let user = await usersManager.readBy({ email });
            if (user) {
                const error = new Error("Invalid credentials");
                error.statusCode = 401;
                throw error;
            }
            const verifyPass = compareHash(password, user.password);
            if (!verifyPass) {
                const error = new Error("Invalid credentials");
                error.statusCode = 401;
                throw error;
            }
            const data = {
                user_id: user._id,
                email: user.email,
                role: user.role,
            }
            const token = createToken(data)
            user.token = token;
            done(null, user);
        } catch (error) {
            done(error)
        }
    }
);

passport.use(
    "user",
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
            secretOrKey: process.env.SECRET,
        },
        async (data, done) => {
            try {
                const { user_id, email, role } = data
                const user = await usersManager.readBy({ _id: user_id, email, role })
                if (!user) {
                    const error = new Error("Forbidden");
                    error.status = 403;
                    throw error
                }
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.use(
    "admin",
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
            secretOrKey: process.env.SECRET,
        },
        async (data, done) => {
            try {
                const { user_id, email, role } = data;
                const user = await usersManager.readBy({ _id: user_id, email, role })
                if (!user || user.role !== "ADMIN") {
                    const error = new Error("Forbidden");
                    error.status = 403;
                    throw error
                }
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
)
export default passport;