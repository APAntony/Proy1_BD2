import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    place: { type: String, required: true },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ["Point"], // 'location.type' must be 'Point'
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    rating: { type: Number, default: 0 },
    enabled: { type: Boolean, default: true },
});

ProductSchema.index({ location: "2dsphere" });
export default model("Product", ProductSchema);
