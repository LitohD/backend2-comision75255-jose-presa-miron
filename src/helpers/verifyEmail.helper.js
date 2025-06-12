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

const verifyEmail = async (email, verifyCode) => {
    try {
        await transport.sendMail({
            from: env.GOOGLE_EMAIL,
            to: email,
            subject: "MAIL DE VERIFICACION DE CUENTA",
            html: `<h1> CODIGO DE VERIFICACION DE CUENTA: ${verifyCode}</h1>
            <a href="http://localhost:8080/verify/${email}">VERIFICAR!</a>`,
            });
    } catch (error) {
        throw error;
    }
};

export default verifyEmail;