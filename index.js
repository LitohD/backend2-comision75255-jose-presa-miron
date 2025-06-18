import "./src/helpers/env.helper.js"
import express from "express";
import __dirname from "./utils.js";
import env from "./src/helpers/env.helper.js";
import path from "path";
import morgan from "morgan";
import { engine } from "express-handlebars";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import indexRouter from "./src/routers/index.router.js";
import cookieParser from "cookie-parser";
import argvsHelper from "./src/helpers/argvs.helper.js";
import dbConnect from "./src/helpers/dbConnect.helper.js";

const server = express();
const PORT = env.PORT;
const ready = async () => {
    console.log(`Listennig to port ${PORT} and mode: ${argvsHelper.mode}`);
    if (env.PERSISTENCE === "mongo") {
        await dbConnect(env.LINK_DB);
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
server.set("views", path.join(__dirname, "src", "views"));
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler); 