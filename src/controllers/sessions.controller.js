class SessionsController {
    createCb = (req, res, next) => {
        try {
            req.session.role = "ADMIN";
            req.session.mode = "dark";
            const message = "Session expiere in 7 days.";
            return res.status(201).json({ message });
        } catch (error) {
            next(error);
        }
    };
    readCb = (req, res, next) => {
        try {
            const session = req.session;
            const message = "Session readed.";
            return res.status(201).json({ message, session });
        } catch (error) {
            next(error);
        }
    };
    destroyCb = (req, res, next) => {
        try {
            req.session.destroy();
            const message = "Session deleted.";
            return res.status(201).json({ message });
        } catch (error) {
            next(error);
        }
    };
}

const sessionsController = new SessionsController();
export default sessionsController;