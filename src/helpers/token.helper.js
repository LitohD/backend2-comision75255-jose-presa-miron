import jwt from "jsonwebtoken";
import env from "../helpers/env.helper.js"

export const createToken = (data) => {
    try {
        const token = jwt.sign(
            data,
            env.SECRET_KEY,
            { expiresIn: 7 * 24 * 60 * 60 }
        );
        return token;
    } catch (error) {
        error.statusCode = 401;
        throw error;
    }
};

export const verifyToken = (token) => {
    try {
        const data = jwt.verify(
            token,
            env.SECRET_KEY
        );
        return data
    } catch (error) {
        error.statusCode = 403;
        throw error;
    }
};