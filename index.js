import cors from 'cors';
import express from 'express';
import mongoDBClient from './mongoClient.js';
import Product from './models/product.js';
import bodyParser from "express";
import Order from "./models/order.js";

const PORT = 2023;

const app = express();

app.use(bodyParser.json());

// API Rest 
// const Product = require('./models/product');
app.get('/products', async (req, res) => {
    const products = await Product.find({});
    try {
        res.send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get('/products/:category', async (req, res) => {
    const category = req.params.category;
    const products = await Product.find({category: category});
    try {
        res.send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get('/orders', async (req, res) => {
    const orders = await Order.find({});
    try {
        res.send(orders);
    }catch (e){
        res.status(500).send(e);
    }
});

app.post('/products', async (req, res) => {
    const {category, name, description, price, imageUrl} = req.body;
    const product = new Product({category, name, description, price, imageUrl});

    product.save().then(r => res.send(r._id)).catch(e => res.status(500).send(e));
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello Express! 🎉');
});

app.listen(PORT, () => {
    console.log(`Server up and running on port http://localhost:${PORT} 🎉`);
    mongoDBClient.initialize();
});