import usersController from "../../controllers/users.controller.js";
import RouterHelper from "../../helpers/router.helper.js";

class UserRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };
    init = () => {
        this.read("/", ["USER", "ADMIN"], usersController.getAllUsers);
        this.read("/:email", ["USER", "ADMIN"], usersController.sendEmailCb)
    }
};

const usersRouter = new UserRouter().getRouter();
export default usersRouter;