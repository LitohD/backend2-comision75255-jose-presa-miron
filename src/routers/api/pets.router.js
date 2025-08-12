import petsController from "../../controllers/pets.controller.js";
import RouterHelper from "../../helpers/router.helper.js";

class PetsRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.read("/", ["USER", "ADMIN"], petsController.getAllPets);
    }
}

const petsRouter = new PetsRouter().getRouter();
export default petsRouter;