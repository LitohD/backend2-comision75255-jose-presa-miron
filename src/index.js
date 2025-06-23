import "./helpers/env.helper.js"
import express from "express";
import __dirname from "./utils.js";
import env from "./helpers/env.helper.js";
import path from "path";
import morgan from "morgan";
import { engine } from "express-handlebars";
import pathHandler from "./middlewares/pathHandler.mid.js";
import errorHandler from "./middlewares/errorHandler.mid.js";
import indexRouter from "./routers/index.router.js";
import cookieParser from "cookie-parser";
import argvsHelper from "./helpers/argvs.helper.js";
import dbConnect from "./helpers/dbConnect.helper.js";
import cors from "cors"

const server = express();
const PORT = env.PORT;
const ready = async () => {
    console.log(`Listenig to port ${PORT} and mode: ${argvsHelper.mode}`);
    if (env.PERSISTENCE === "mongo") {
        await dbConnect(env.LINK_DB);
    }
};
server.listen(PORT, ready);

server.use(cookieParser(env.SECRET_COOKIE));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "../public")));
server.use(morgan("dev"));
server.use(cors({ origin: true, credentials: true }))

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