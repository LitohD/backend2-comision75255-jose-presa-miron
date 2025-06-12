import { verifyToken } from "../helpers/token.helper.js";
import { usersService } from "../services/service.js";

const setupPolicies = (pol) => async (req, res, next) => {
    try {
        const policiesArray = Array.isArray(pol) ? pol : ["PUBLIC"];
        if (policiesArray.includes("PUBLIC")) return next();
        const token = req?.cookies?.token;
        if (!token) return res.json401();
        const data = verifyToken(token);
        const { user_id, email, role } = data;
        if (!user_id || !email || !role) return res.json401();
        const allowedRoles = {
            USER: policiesArray.includes("USER"),
            ADMIN: policiesArray.includes("ADMIN"),
        };
        if (!allowedRoles[role]) return res.json401();
        const user = await usersService.readById(user_id);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    };
};

export default setupPolicies;