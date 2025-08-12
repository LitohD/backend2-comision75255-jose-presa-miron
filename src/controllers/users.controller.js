import { usersRepository } from "../repositories/repository.js";
import sendEmail from "../helpers/email.helper.js";

class UsersController {
    updateUserCb = async (req, res, next) => {
        try {
            const data = req.body;
            const uid = req.user._id;
            const response = await usersRepository.updateById(uid, data);
            const { method, originalUrl: url } = req;
            res.status(200).json({ response, method, url });
        } catch (error) {
            next(error);
        }
    };

    sendEmailCb = async (req, res, next) => {
        try {
            const { email } = req.params;
            await sendEmail(email);
            const { method, originalUrl: url } = req;
            res.status(200).json({ response: "Email sent!", method, url });
        } catch (error) {
            next(error);
        }
    };

    getAllUsers = async (req, res, next) => {
        try {
            const users = await usersRepository.readAll();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    };
}

const usersController = new UsersController();
export default usersController;