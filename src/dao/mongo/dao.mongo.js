import Product from "./models/products.model.js"
import Cart from "./models/carts.model.js"
import User from "./models/users.model.js"
import Pet from "./models/pets.model.js"

class DaoMongo {
    constructor(model) {
        this.model = model
    }
    createOne = async (data) => await this.model.create(data);
    readAll = async (filter) => await this.model.find(filter).lean();
    readById = async (id) => await this.model.findOne({ _id: id }).lean();
    readBy = async (filter) => await this.model.findOne(filter).lean();
    updateById = async (id, data) => this.model.findByIdAndUpdate(id, data, { new: true });
    destroyById = async (id) => await this.model.findByIdAndDelete(id);
}

const productsManager = new DaoMongo(Product);
const cartsManager = new DaoMongo(Cart);
const usersManager = new DaoMongo(User);
const petsManager = new DaoMongo(Pet);

export { productsManager, cartsManager, usersManager, petsManager };