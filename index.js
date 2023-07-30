import cors from 'cors';
import express from 'express';
import mongoDBClient from './mongoClient.js';
import Product from './models/product.js';
import { graphqlHTTP } from 'express-graphql';
import schema from './schemas/index.js';
const PORT = 2023

const app = express()


// API Rest 
// const Product = require('./models/product');
app.get('/products', async (req, res) => {
	const products = await Product.find({})
	try {
		res.send(products)
	} catch (e) {
		res.status(500).send(e)
	}
})

app.get('/products/:category', async (req, res) => {
	const category = req.params.category
	const products = await Product.find({ category: category })
	try {
		res.send(products)
	} catch (e) {
		res.status(500).send(e)
	}
})

app.use(cors())


// GraphQL UI
app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	}),
);

app.get('/', (req, res) => {
	res.send('Hello Express! 🎉')
})

app.listen(PORT, () => {
	console.log(`Server up and running on port http://localhost:${PORT} 🎉`)
	mongoDBClient.initialize()
})