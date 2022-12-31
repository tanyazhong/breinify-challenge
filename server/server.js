import express from 'express';
import bodyParser from 'body-parser';
import redis from 'redis';

/**
 * Connect to redis
 */
const client = redis.createClient();

await client.connect();

client.on('connect', function (err) {
	if (err) {
		console.log('Could not establish a connection with Redis. ' + err);
	} else {
		console.log('Connected to Redis successfully!');
	}
});

const app = express();
const port = 5001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('In the server');
});

const PRODUCTS_KEY = 'products';

const handleError = (err, val) => {
	if (err) console.log(err);
}

// initialize db with products passed from frontend
const cb = async (req, res) => {
	await client.set(PRODUCTS_KEY, JSON.stringify(req.body.products));
	const products = await client.get(PRODUCTS_KEY);
	res.send({ products: JSON.parse(products) });
}
app.post('/initProducts', cb)

///////////////////// GET ////////////////////////
const getProducts = async (req, res) => {
	const data = await client.get(PRODUCTS_KEY, handleError)
	res.send({ products: JSON.parse(data) })
}

app.get('/getProducts', getProducts);

///////////////////// POST ////////////////////////
const addProduct = async (req, res) => {
	const item = req.body.item;
	let products = await client.get(PRODUCTS_KEY, handleError)
	let parsedProducts = JSON.parse(products);
	parsedProducts === null ? parsedProducts = [item] : parsedProducts.push(item);
	client.set("products", JSON.stringify(parsedProducts), handleError)
	products = await client.get(PRODUCTS_KEY, handleError)
	res.send({ products: JSON.parse(products) })
}

app.post('/addProduct', addProduct)

////////////////////// PUT /////////////////////////
const updateProduct = async (req, res) => {
	const item = req.body.item;
	let products = await client.get(PRODUCTS_KEY, handleError)
	let parsedProducts = JSON.parse(products);
	// Look for the product whose id matches the id from the request body
	for (let i = 0; i < parsedProducts.length; i++) {
		if (parsedProducts[i].id == item.id) {
			parsedProducts[i] = item;
			break;
		}
	}
	client.set("products", JSON.stringify(parsedProducts), handleError)
	products = await client.get(PRODUCTS_KEY, handleError)
	res.send({ products: JSON.parse(products) })
}

app.put('/updateProduct', updateProduct)

/////////////////////// DELETE /////////////////////////
const deleteProduct = async (req, res) => {
	const id = req.body.id;
	let products = await client.get(PRODUCTS_KEY, handleError)
	let parsedProducts = JSON.parse(products);
	// Look for the product in parsedProducts whose id matches the id from the request body and remove it
	for (let i = 0; i < parsedProducts.length; i++) {
		if (parsedProducts[i].id === id) {
			parsedProducts.splice(i, 1)
			break;
		};
	}
	client.set("products", JSON.stringify(parsedProducts), handleError)
	products = await client.get(PRODUCTS_KEY, handleError)
	res.send({ products: JSON.parse(products) })
}

app.delete('/deleteProduct', deleteProduct)

app.listen(port, () => console.log(`Running on port: ${port}`));

