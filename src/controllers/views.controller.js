import { productsService } from "../services/service.js";

class ViewsController {
    indexView = async (req, res) => {
        const products = await productsService.readAll();
        res.status(200).render("index", { products });
    };
    registerView = async (req, res) => {
        res.status(200).render("register");
    };
    loginView = async (req, res) => {
        res.status(200).render("login");
    };
    detailView = async (req, res) => {
        const { pid } = req.params;
        const product = await productsService.readById(pid);
        res.status(200).render("details", { product });
    };
    profileView = async (req, res) => {
        const { user } = req;
        res.status(200).render("profile", { user });
    };
    updateUSerView = async (req, res) => {
        const { user } = req;
        res.status(200).render("update-user", { user });
    };
    verifyView = async (req, res) => {
        const { email } = req.params;
        res.status(200).render("verify", { email });
    };
    resetView = async (req, res) => {
        const { email } = req.params;
        res.status(200).render("reset", { email });
    };

    forgotPasswordView = async (req, res) => {
        const { email } = req.params;
        res.status(200).render("recover", { email });
    };
}

const viewsController = new ViewsController();
export default viewsController;