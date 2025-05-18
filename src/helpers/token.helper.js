import jwt from "jsonwebtoken";

const createToken = (data) => {
    try {
        const token = jwt.sign(
            data, process.env.SECRET,
            { expiresIn: 30 * 24 * 60 * 60 * 1000 }
        )
        return token
    } catch (error) {
        error.statusCode = 401
        throw error
    }
}

const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, process.env.SECRET)
        return data;
    } catch (error) {
        error.statusCode = 403
        throw error
    }
}

export { createToken, verifyToken }