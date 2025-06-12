import mongoose from "mongoose";
import env from "../helpers/env.helper.js"

const mongoUrl = env.MONGO_URL;

mongoose.connect(mongoIrl)
    .then((result) => {
        console.log("Connected to DB");
    }).catch((err) => {
        console.error("Error connecting to DB", err);
    });