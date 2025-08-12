import { Schema, model, Types } from "mongoose";

const collection = "pets";
const schema = new Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String },
    age: { type: Number },
    owner: { type: Types.ObjectId, ref: "users", default: null },
    adopted: { type: Boolean, default: false },
}, { timestamps: true });

const Pet = model(collection, schema);
export default Pet;
