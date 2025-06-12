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

const sendEmail = async (email) => {
    try {
        await transport.sendMail({
            from: env.GOOGLE_EMAIL,
            to: email,
            subject: "MAIL DE PRUEBA",
            html: "<h1> CORREO DE PRUEBA CON NODEMEILER</h1>",
        });
    } catch (error) {
        throw error;
    }
};

export { transport };
export default sendEmail;