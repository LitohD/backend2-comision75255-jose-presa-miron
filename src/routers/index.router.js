import viewsRouter from "./views.router.js";
import apiRouter from "./api.router.js";
import RouterHelper from "../helpers/router.helper.js";

class IndexRouter extends RouterHelper {
    constructor() {
        super();
        this.init();
    };
    init = () => {
        this.use("/", ["PUBLIC"], viewsRouter);
        this.use("/api", ["PUBLIC"], apiRouter);
    }
};

const indexRouter = new IndexRouter().getRouter();
export default indexRouter;