import transport from "../helpers/emailTransport.js";
import env from "../helpers/env.helper.js";

class EmailService {
    constructor() {
        this.from = env.GOOGLE_EMAIL;
    }
    async sendVerificationEmail(email, verifyCode) {
        try {
            const link = `http://localhost:8080/verify/${email}`;
            const html = `<h1> CODIGO DE VERIFICACION DE CUENTA: ${verifyCode}</h1>
            <a href="${link}">Verificar cuenta!</a>
            `;
            await transport.sendMail({
                from: this.from,
                to: email,
                subject: "MAIL DE VERIFICACION DE CUENTA",
                html,
            });
        } catch (error) {
            throw error;
        }
    }
    async sendRecoveryEmail(email) {
        try {
            const link = `http://localhost:8080/reset/${email}`;
            const html = `
            <h1>Recuperación de contraseña</h1>
            <p>Hacé clic en el siguiente enlace para restablecer tu contraseña:</p>
            <a href="${link}">Verificar cuenta!</a>
            `;
            await transport.sendMail({
                from: this.from,
                to: email,
                subject: "MAIL DE RECUPERACION DE PASSWORD",
                html,
            });
        } catch (error) {
            throw error;
        }
    }
}

const emailService = new EmailService();
export default emailService;