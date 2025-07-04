import { transport } from "./email.helper.js";

const verifyEmail = async (email, verifyCode) => {
    try {
        await transport.sendMail({
            from: env.GOOGLE_EMAIL,
            to: email,
            subject: "MAIL DE VERIFICACION DE CUENTA",
            html: `<h1> CODIGO DE VERIFICACION DE CUENTA: ${verifyCode}</h1>
            <a href="http://localhost:8080/verify/${email}">VERIFICAR!</a>
            `,
        });
    } catch (error) {
        throw error;
    }
};


export default verifyEmail;