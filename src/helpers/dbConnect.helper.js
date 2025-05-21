import { connect } from "mongoose";

const dbConnect = async (link) => {
    try {
        await connect(link);
        console.log("Mongo database connected");
    } catch (error) {
        console.error("Error de conexión a MongoDB:", error.message);
    }
};

export default dbConnect;