import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    description: String,
    price: Number,
    imageURL: String,
}, {collection: 'products'});

export default mongoose.model('Product', productSchema);
