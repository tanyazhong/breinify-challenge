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


// GET
// helper func gets all cards
function getCards() {
	return new Promise((resolve, reject) => {
		client.get("cards", (err, cards) => {
			if (!err) { resolve(JSON.parse(cards)); }
		})
	})
}

app.get('/getCards', async (req, res) => {
	// Please finish the logic in retrieving the cards from redis
	// await client.set('key', JSON.stringify({ hello: 'world' }));
	// const value = await client.get('key');
	// res.send({ value: JSON.parse(value) });
	try {
		getCards().then(cards => {
			res.json({ cards: cards }).status(200);
		})
	}
	catch (e) {
		res.json({ err: e }).status(500);
	}
});

// POST
function addCard(item) {
	return new Promise((resolve, reject) => {
		getCards.then(cards => {
			// console.log(cards)
			if (cards === null) {
				const newCards = [item];
				client.set("cards", JSON.stringify(newCards), (err, stored) => {
					if (stored) { resolve(item); }
				})
			}
			else {
				cards.push(item);
				client.set("cards", JSON.stringify(cards), (err, stored) => {
					if (stored) { resolve(item); }
				})
			}
		})
	})
}

app.get('/addCard', async (req, res) => {
	try {
		const item = req.body.item;
		// console.log(item)
		addCard(item).then(added => {
			res.json({ added: added }).status(200);
		})
	} 
	catch (e) {
		res.json({ err: e }).status(500);
	}
})

// PUT
function updateCard(item) {
	return new Promise((resolve, reject) => {
		getCards().then(cards => {
			for (let i = 0; i < cards.length; i++) {
				if (cards[i].id == id) {
					cards[i] = item;
					break;
				}
			}
			client.set("cards", JSON.stringify(cards), (err, stored) => {
				if (stored) { resolve(item); }
			})
		})
	})
}

app.get('/updateCard', async (req, res) => {
	try {
		const item = req.body.item;
		updateCard(item).then(updated => {
			res.json({ updated: updated }).status(200);
		})
	} 
	catch (e) {
		res.json({ err: e }).status(500);
	}
})


// DELETE
function removeCard(id) {
	return new Promise((resolve, reject) => {
		getCards().then(cards => {
			newCards = [];
			removed = null;
			for (const product of cards) {
				if (product.id != id) newCards.push(product);
				else removed = product;
			}
			client.set("cards", JSON.stringify(newCards), (err, stored) => {
				if (stored) {
					resolve(removed);
				}
			})
		})
	})
}

app.get('/removeCard/:id', async (req, res) => {
	try {
		const id = req.params.id;
		removeCard(id).then(removed => {
			res.json({ removed: removed }).status(200);
		})
	} catch (e) {
		res.json({ err: e }).status(500);
	}
})


app.listen(port, () => console.log(`Running on port: ${port}`));
