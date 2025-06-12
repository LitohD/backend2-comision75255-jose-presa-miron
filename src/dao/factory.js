import env from "../helpers/env.helper.js"

const PERSISTENCE = env.PERSISTENCE;

let dao = {};
switch (PERSISTENCE) {
    case "memory":
        {
            const { productsManager, cartsManager, usersManager } = await import(
                "./memory/dao.memory.js"
            );
            dao = { productsManager, cartsManager, usersManager };
        }
        break;
    case "fs":
        {
            const { productsManager, cartsManager, usersManager } = await import(
                "./fs/dao.fs.js"
            );
            dao = { productsManager, cartsManager, usersManager };
        }
        break;
    default:
        {
            const { productsManager, cartsManager, usersManager } = await import(
                "./mongo/dao.mongo.js"
            );
            dao = { productsManager, cartsManager, usersManager };
        }
        break;
}

const { productsManager, cartsManager, usersManager } = dao;
export { productsManager, cartsManager, usersManager };
export default dao;