import { Schema, Types, model } from "mongoose";

const collection = "products";
const schema = new Schema(
    {
        title: { type: String, required: true, index: true },
        description: { type: String },
        category: { type: String, default: "", enum: [], index: true },
        image: { type: String, default: "https://www.shutterstock.com/shutterstock/photos/2199111735/display_1500/stock-photo-antalya-turkey-september-newly-released-iphone-pro-mockup-set-with-back-and-front-2199111735.jpg" },
        price: { type: Number, default: 10 },
        stock: { type: Number, default: 10 },
        onsale: { type: Boolean, default: false },
        owner_id: { type: Types.ObjectId, ref: "users", index: true },
    },
    { timestamps: true }
);

schema.pre(/^find/, function () {
    this.populate("owner_id", "email avatar");
});

const Product = model(collection, schema);

export default Product;