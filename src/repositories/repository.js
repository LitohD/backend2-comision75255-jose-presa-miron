import { productsManager, usersManager, cartsManager } from "../dao/factory.js";
import ProductsDTO from "../dto/products.dto.js";
import CartsDTO from "../dto/carts.dto.js";
import UsersDTO from "../dto/users.dto.js";

class Repository {
    constructor(manager, Dto) {
        this.manager = manager;
        this.Dto = Dto;
    }
    readAll = async (filter) => await this.manager.readAll(filter);
    readById = async (id) => await this.manager.readById(id);
    readBy = async (filter) => await this.manager.readBy(filter);
    createOne = async (data) => await this.manager.createOne(new this.Dto(data));
    updateById = async (id, data) => await this.manager.updateById(id, data);
    destroyById = async (id) => await this.manager.destroyById(id);
};

const productsRepository = new Repository(productsManager, ProductsDTO);
const cartsRepository = new Repository(cartsManager, CartsDTO);
const usersRepository = new Repository(usersManager, UsersDTO);
export { productsRepository, cartsRepository, usersRepository };