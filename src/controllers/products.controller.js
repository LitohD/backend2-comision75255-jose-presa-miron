import { productsService } from "../services/service.js";

class ProductsController {
    createOne = async (req, res) => {
        const data = req.body;
        data.owner_id = req.user._id;
        const response = await productsService.createOne(data);
        res.json200(response);
    };
    readAll = async (req, res) => {
        const filter = req.query;
        const response = await productsService.readAll(filter);
        if (response.length === 0) {
            res.json404();
        }
        res.json200(response);
    };
    readById = async (req, res) => {
        const { id } = req.params;
        const response = await productsService.readById(id);
        if (!response) {
            res.json404();
        }
        res.json200(response);
    };
    updateById = async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        const response = await productsService.updateById(id, data);
        if (!response) {
            res.json404();
        }
        res.json200(response);
    };
    destroyById = async (req, res) => {
        const { id } = req.params;
        const response = await productsService.destroyById(id);
        if (!response) {
            res.json404();
        }
        res.json200(response);
    };
}

const productsController = new ProductsController();
export default productsController;