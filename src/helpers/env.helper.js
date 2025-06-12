import { config } from "dotenv";
import argvsHelper from "./argvs.helper.js";

const mode = argvsHelper.mode;
const path = ".env." + mode;

config({ path });

const env = {
    PORT: process.env.PORT || 8080,
    SECRET_COOKIE: process.env.SECRET_COOKIE || "defaultSecret",
    MONGO_URL: process.env.MONGO_URL || "mongobd://localhost:27017/miDB",
    SECRET_SESSION: process.env.SECRET_SESSION,
    GITHUB_APP_ID: process.env.GITHUB_APP_ID,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    GOOGLE_APP_PASSWORD: process.env.GOOGLE_APP_PASSWORD,
    GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
    PERSISTENCE: process.env.PERSISTENCE
};

export default env;