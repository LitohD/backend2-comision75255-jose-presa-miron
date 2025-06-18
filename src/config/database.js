import mongoose from "mongoose";
import env from "../helpers/env.helper.js"

const mongoUrl = env.LINK_DB;

mongoose.connect(mongoUrl)
    .then((result) => {
        console.log("Connected to DB");
    }).catch((err) => {
        console.error("Error connecting to DB", err);
    }); 