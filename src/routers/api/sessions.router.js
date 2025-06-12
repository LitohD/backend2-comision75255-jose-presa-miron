import { Router } from "express";
import SessionsController from "../../controllers/sessions.controller.js"

const sessionRouter = Router();

sessionRouter.get("/create", SessionsController.createCb);
sessionRouter.get("/read", SessionsController.readCb);
sessionRouter.get("/destroy", SessionsController.destroyCb);

export default sessionRouter;