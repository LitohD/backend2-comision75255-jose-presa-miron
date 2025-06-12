import { createTransport } from "nodemailer";
import __dirname from "../utils.js";
import env from "../helpers/env.helper.js";

const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: env.GOOGLE_EMAIL,
        pass: env.GOOGLE_APP_PASSWORD,
    },
});

export default transport;