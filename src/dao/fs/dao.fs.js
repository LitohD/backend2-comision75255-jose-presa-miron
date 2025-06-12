class DaoFs {
    constructor() { }

    createOne = async (data) => { };
    readAll = async (filter) => { };
    readById = async (data) => { };
    readBy = async (id) => { };
    updateById = async (id, data) => { };
    destroyById = async (id) => { };
}

const productsManager = new DaoFs(Product);
const cartsManager = new DaoFs(Cart);
const usersManager = new DaoFs(User);

export { productsManager, cartsManager, usersManager };