
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gestión de usuarios
 */
import usersController from "../../controllers/users.controller.js";
import RouterHelper from "../../helpers/router.helper.js";

class UserRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };
    init = () => {
        /**
         * @swagger
         * /api/users:
         *   get:
         *     summary: Obtener todos los usuarios
         *     tags: [Users]
         *     responses:
         *       200:
         *         description: Lista de usuarios
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *       401:
         *         description: No autorizado
         */
        this.read("/", ["USER", "ADMIN"], usersController.getAllUsers);

        /**
         * @swagger
         * /api/users/{email}:
         *   get:
         *     summary: Enviar email a un usuario
         *     tags: [Users]
         *     parameters:
         *       - in: path
         *         name: email
         *         required: true
         *         schema:
         *           type: string
         *         description: Email del usuario
         *     responses:
         *       200:
         *         description: Email enviado correctamente
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 response:
         *                   type: string
         *                 method:
         *                   type: string
         *                 url:
         *                   type: string
         *       401:
         *         description: No autorizado
         */
        this.read("/:email", ["USER", "ADMIN"], usersController.sendEmailCb)
    }
};

const usersRouter = new UserRouter().getRouter();
export default usersRouter;