class DaoMemory {
    constructor() { }

    createOne = async (data) => { };
    readAll = async (filter) => { };
    readById = async (data) => { };
    readBy = async (id) => { };
    updateById = async (id, data) => { };
    destroyById = async (id) => { };
}

const productsManager = new DaoMemory(Product);
const cartsManager = new DaoMemory(Cart);
const usersManager = new DaoMemory(User);

export { productsManager, cartsManager, usersManager };