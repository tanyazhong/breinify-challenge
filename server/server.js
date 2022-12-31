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

// initialize db with cards passed from frontend
const cb = async (req, res) => {
	await client.set('cards', JSON.stringify(req.body.cards));
	const data = await client.get('cards');
	res.send({ cards:  JSON.parse(data) });
}
app.post('/initCards', cb)

// GET

// const redisGet = (key) => {
// 	console.log("HERE")
// 	return new Promise((resolve, reject) => {
// 		client.get(key, (err, data) => {
// 			if (err) reject(err);
// 			return resolve(data)
// 		})
// 	})
// }

const getCards = async (req, res) => {
	// await client.set('cards', JSON.stringify([{ id: 2 }]));
	const data = await client.get('cards', (err, val) => {
		if (err) throw err;
	})
	res.send({ cards: JSON.parse(data) })
}

app.get('/getCards', getCards);
// async (req, res) => { 
// 	redisGet('cards').then(cards => {
// 		console.log(cards)
// 		res.json({cards: JSON.parse(cards)}).status(200)
// 	})
// });

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
	// set the data
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

const updateCard = async (req, res) => {
	const item = req.body.item;
	let cards = await client.get('cards', (err, val) => {
		if (err) throw err;
	})
	let parsedCards = JSON.parse(cards);
	console.log(parsedCards)
	// Look for the product whose id matches the id from the request body
	for (let i = 0; i < parsedCards.length; i++) { 
		if (parsedCards[i].id == item.id) {
			parsedCards[i] = item;
			break;
		}
	}
	client.set("cards", JSON.stringify(parsedCards), (err, val) => {
		if (err) throw err;
	})
	cards = await client.get('cards', (err, val) => {
		if (err) throw err;
	})
	res.send({ cards: cards })
}

app.put('/updateCard', updateCard)


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

app.delete('/removeCard', (req, res) => {
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

app.listen(port, () => console.log(`Running on port: ${port}`));

