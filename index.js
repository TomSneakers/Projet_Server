import cors from 'cors';
import express from 'express';
import mongoDBClient from './mongoClient.js';
import Product from './models/product.js';
import bodyParser from "express";
import Order from "./models/order.js";

const PORT = 2023;

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

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
    const category = req.params.category.toLowerCase();
    console.log(category);
    const products = await Product.find({category: { $regex: new RegExp("^" + category, "i") }}, );
    try {
        res.send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get("/product/:id", async (req, res) => {
    const productId = req.params.id;
    Product.findOne({_id: productId})
           .then(product => res.send(product))
           .catch(err => res.status(500).send(err));
});

app.get('/orders', async (req, res) => {
    const orders = await Order.find({});
    try {
        res.send(orders);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get("/order/:id", async (req, res) => {
    const orderId = req.params.id;
    Order.findOne({_id: orderId})
         .then(order => {
             res.send(order);
         })
         .catch(err => res.status(500).send(err));
});

app.post('/orders', async (req, res) => {
    const {clientDetails, items, total} = req.body;
    const order = new Order({clientDetails, items, total, date: new Date()});

    order.save().then(r => res.send(r._id)).catch(e => res.status(500).send(e));
});

app.post('/products', async (req, res) => {
    const {category, name, description, prices, imageUrl} = req.body;
    const product = new Product({category, name, description, prices, imageUrl});

    product.save().then(r => res.send(r._id)).catch(e => res.status(500).send(e));
});

app.put('/product/:id', async (req, res) => {
    const id = req.params.id;
    const {category, name, description, prices, imageUrl} = req.body;
    Product.updateOne({_id: id}, {category, name, description, prices, imageUrl})
           .then(r => res.send(r._id))
           .catch(e => res.status(500).send(e));

});

app.delete('/product/:id', async (req, res) => {
    const id = req.params.id;
    Product.findByIdAndDelete({_id: id})
           .then(r => res.send(r._id))
           .catch(e => res.status(500).send(e));

});

app.get('/', (req, res) => {
    res.send('Hello Express! 🎉');
});

app.listen(PORT, () => {
    console.log(`Server up and running on port http://localhost:${PORT} 🎉`);
    mongoDBClient.initialize();
});