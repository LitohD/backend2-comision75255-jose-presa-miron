import productsRouter from "./api/products.router.js";
import cartsRouter from "./api/carts.router.js";
import usersRouter from "./api/users.router.js";
import cookieRouter from "./api/cookies.router.js"
import sessionRouter from "./api/sessions.router.js"
import authRouter from "./api/auth.router.js";
import RouterHelper from "../helpers/router.helper.js";
import mocksRouter from './api/mocks.router.js';
import petsRouter from "./api/pets.router.js";

class ApiRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };
    init = () => {
        this.use("/products", ["PUBLIC"], productsRouter);
        this.use("/carts", ["PUBLIC"], cartsRouter);
        this.use("/users", ["PUBLIC"], usersRouter);
        this.use("/cookies", ["PUBLIC"], cookieRouter);
        this.use("/session", ["PUBLIC"], sessionRouter);
        this.use("/auth", ["PUBLIC"], authRouter);
        this.use('/mocks', ['PUBLIC'], mocksRouter);
        this.use("/pets", ["PUBLIC"], petsRouter);        
    }
};

const apiRouter = new ApiRouter().getRouter();
export default apiRouter;