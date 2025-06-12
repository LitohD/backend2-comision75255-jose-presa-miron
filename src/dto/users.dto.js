import crypto from "crypto";
import { createHash } from "../helpers/hash.helper.js";
import env from "../helpers/env.helper.js";

const PERSISTENCE = env.PERSISTENCE;

class UsersDTO {
    constructor(data) {
        if (PERSISTENCE !== "mongo") {
            this._id = crypto.randomBytes(12).toString("hex");
        }
        this.name = data.name;
        this.date = data.data;
        this.city = data.city;
        this.email = data.email;
        this.password = createHash(data.password);
        this.avatar =
            data.avatar || "https://cdn-icons-png.flaticon.com/512/266/266033.png";
        this.role = data.role || "USER";
        this.verifyCode = data.verifyCode || crypto.randomBytes(12).toString("hex");
        if (PERSISTENCE !== "mongo") {
            this.isVerified = data.isVerified || false;
            this.createdAt = new Date();
            this.updatedAt = new Date();
        }
    }
}

export default UsersDTO;