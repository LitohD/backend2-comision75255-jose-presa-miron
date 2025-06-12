import express from "express";
import __dirname from "./utils.js";
import env from "./helpers/env.helper.js";
import path from "path";
import morgan from "morgan";
import { engine } from "express-handlebars";
import pathHandler from "./middlewares/pathHandler.mid.js";
import errorHandler from "./middlewares/errorHandler.mid.js";
import indexRouter from "./routes/index.routes.js";
import cookieParser from "cookie-parser";
import argvsHelper from "./helpers/argvs.helper.js";
import dbConnect from "./helpers/dbConnect.helper.js";

const server = express();
const PORT = env.PORT;
const ready = async () => {
    console.log(`Listennig to port ${PORT} and mode: ${argvsHelper.mode}`);
    if (env.PERSISTENCE === "mongo") {
        await dbConnect(env.MONGO_URL);
    }
};
server.listen(PORT, ready);

server.use(cookieParser(env.SECRET_COOKIE));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "..", "public")));
server.use(morgan("dev"));

server.engine(
    "handlebars",
    engine({
        helpers: {
            eq: (a, b) => a === b,
        },
    })
);
server.set("view engine", "handlebars");
server.set("views", path.join(__dirname, "views"));
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);