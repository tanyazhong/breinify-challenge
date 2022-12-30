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

// const cb = async (req, res) => {
// 	await client.set('key', JSON.stringify({ hello: 'world' }));
// 	const value = await client.get('key');
// 	res.send({ value: value });
// }
// app.get('/test', cb)

// GET

const getCards = async (req, res) => {
	// await client.set('cards', JSON.stringify([{ hello: 'world' }]));
	const data = await client.get('cards', (err, val) => {
		if (err) throw err;
	})
	res.send({ cards: JSON.parse(data) })
}

app.get('/getCards', getCards);

// POST

const addCard = async (req, res) => {
	const item = req.body.item;
	let cards = await client.get('cards', (err, val) => {
		if (err) throw err;
	})
	let parsedCards = JSON.parse(cards);
	if (parsedCards === null) {
		parsedCards = [item];
	}
	else { 
		parsedCards.push(item);
	}
	client.set("cards", JSON.stringify(parsedCards), (err, val) => {
		if (err) throw err;
	})
	cards = await client.get('cards', (err, val) => {
		if (err) throw err;
	})
	res.send({ cards: cards })
}

app.post('/addCard', addCard)

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

app.get('/updateCard', (req, res) => {
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
			let newCards = [];
			let removed;
			for (const item of cards) {
				if (item.id != id) newCards.push(item);
				else removed = item;
			}
			client.set("cards", JSON.stringify(newCards), (err, stored) => {
				if (stored) {
					resolve(removed);
				}
			})
		})
	})
}

app.get('/removeCard/:id', (req, res) => {
	try {
		const id = req.params.id;
		removeCard(id).then(removed => {
			res.json({ removed: removed }).status(200);
		})
	}
	catch (e) {
		res.json({ err: e }).status(500);
	}
})

// addCard({ id: 1, name: "shirt", description: "a short shirt" }).then(res => {
// 	console.log(res);
// 	getCards().then(cards => {
// 		console.log(cards);
// 	})
// })

app.listen(port, () => console.log(`Running on port: ${port}`));

