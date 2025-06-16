import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { usersService } from "../services/service.js";
import { compareHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";
import env from "../helpers/env.helper.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import verifyEmail from "../helpers/verifyEmail.helper.js";
import emailService from "../services/emailService.js";

const callbackURL = "http://localhost:8080/api/auth/google/redirect";

passport.use(
    "register",
    new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: "email",
        },
        async (req, email, password, done) => {
            try {
                const { city } = req.body;
                if (!city) {
                    const error = new Error("Invalid data");
                    error.statusCode = 400;
                    throw error;
                }
                let user = await usersService.readBy({ email });
                if (user) {
                    done(null, null, { message: "Invalid Credential", statusCode: 401 });
                }
                user = await usersService.createOne(req.body);
                await emailService.sendVerificationEmail(user.email, user.verifyCode)
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: "email",
        },
        async (req, email, password, done) => {
            try {
                let user = await usersService.readBy({ email });
                if (!user) {
                    const error = new Error("Invalid credential");
                    error.statusCode = 401;
                    throw error;
                }
                const verifyPass = compareHash(password, user.password);
                if (!verifyPass) {
                    done(null, null, { message: "Invalid Credential", statusCode: 401 });
                }
                const { isVerified } = user;
                if (!isVerified) {
                    return done(null, null, {
                        message: "Please verify your account"
                    })
                }

                const data = {
                    user_id: user._id,
                    email: user.email,
                    role: user.role,
                };
                const token = createToken(data);
                console.log(token);
                user.token = token;
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
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
                const { user_id, email, role } = data;
                const user = await usersRepository.readBy({
                    _id: user_id,
                    email,
                    role,
                });
                if (!user) {
                    return done(null, null, { message: "Forbidden", statusCode: 403 });
                }
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

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
                const user = await usersRepository.readBy({
                    _id: user_id,
                    email,
                    role,
                });
                if (!user || user.role !== "ADMIN") {
                    return done(null, null, { message: "Forbidden", statusCode: 403 });
                }
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    "google",
    new GoogleStrategy(
        { clientID: env.GOOGLE_ID, clientSecret: env.GOOGLE_SECRET, callbackURL },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile);
                const { email, name, picture, id } = profile;
                let user = await usersService.readBy({ email: id });
                if (!user) {
                    user = {
                        email: id,
                        name: name.givenName,
                        password: email,
                        city: "Google",
                    };
                    user = await usersService.createOne(user);
                }
                const data = {
                    user_id: user._id,
                    email: user.email,
                    role: user.role,
                };
                const token = createToken(data);
                console.log(token);
                user.token = token;
                done(null, done);
            } catch (error) {
                done(error);
            }
        }
    )
);

export default passport;