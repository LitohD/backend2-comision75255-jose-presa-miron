import { productsRepository, cartsRepository, usersRepository, petsRepository } from "../repositories/repository.js";

class Service {
    constructor(repository) {
        this.repository = repository;
    }
    readAll = async (filter) => await this.repository.readAll(filter);
    readById = async (id) => await this.repository.readById(id);
    readBy = async (filter) => await this.repository.readBy(filter);
    createOne = async (data) => await this.repository.createOne(data);
    updateById = async (id, data) => await this.repository.updateById(id, data);
    destroyById = async (id) => await this.repository.destroyById(id);
    bulkInsert = async (array) => {
        return await this.repository.manager.model.insertMany(array);
    }
}

const productsService = new Service(productsRepository);
const cartsService = new Service(cartsRepository);
const usersService = new Service(usersRepository);
const petsService = new Service(petsRepository);

export { productsService, cartsService, usersService, petsService};