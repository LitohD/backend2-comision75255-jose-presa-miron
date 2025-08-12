const { PERSISTENCE } = process.env;

let dao = {};

switch (PERSISTENCE) {
    case "memory":
        {
            console.log("memory connected");
            const { productsManager, cartsManager, usersManager, petsManager } = await import(
                "./memory/dao.memory.js"
            );
            dao = { productsManager, cartsManager, usersManager, petsManager };
        }
        break;
    case "fs":
        {
            console.log("fs connected");
            const { productsManager, cartsManager, usersManager, petsManager } = await import(
                "./fs/dao.fs.js"
            );
            dao = { productsManager, cartsManager, usersManager, petsManager };
        }
        break;
    default:
        {
            const { productsManager, cartsManager, usersManager, petsManager } = await import(
                "./mongo/dao.mongo.js"
            );
            dao = { productsManager, cartsManager, usersManager, petsManager };
        }
        break;
}

const { productsManager, cartsManager, usersManager, petsManager } = dao;
export { productsManager, cartsManager, usersManager, petsManager };
export default dao;