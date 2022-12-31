import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap/';
import { IProduct } from '../../interface/IProduct';
// import { IProduct } from '../../interface/IProduct';
// import {v4 as uuidv4} from 'uuid';
import { productData } from '../../productData';

export function Dashboard() {
	const [cards, setCards] = useState<IProduct[]>([])

	useEffect(() => {
		// init db with some product data
		try {
			fetch('/initCards', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', },
				body: JSON.stringify({ cards: productData }),
			})
				.then((res) => res.json())
				.then((data) => setCards(data.cards as IProduct[]))
				.catch((err) => console.log(err))
		}
		catch (error) { console.log(error) }
	}, []);

	// const getCard = () => {
	// 	fetch('/getCard')
	// 		.then((res) => res.json())
	// 		.then(data => {
	// 			setCards(data.cards)
	// 		})
	// 		.catch((err) => console.log(err))
	// }

	// const addProduct = () => {
	// 	fetch('/addCard', {
	// 		method: 'POST',
	// 		headers: { 'Content-Type': 'application/json', },
	// 		body: JSON.stringify({
	// 			// name: formData, // Use your own property name / key
	// 			item: {
	// 				id: 2,
	// 				name: "cheese"
	// 			}
	// 		}),
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => setCards(data))
	// 		.catch((err) => console.log(err))
	// }

	// const updateProduct = () => {
	// 	fetch('/updateCard', {
	// 		method: 'PUT',
	// 		headers: { 'Content-Type': 'application/json', },
	// 		body: JSON.stringify({
	// 			// name: formData, // Use your own property name / key
	// 			item: {
	// 				id: 2,
	// 				name: "milk"
	// 			}
	// 		}),
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => setCards(data))
	// 		.catch((err) => console.log(err))
	// }

	// const removeProduct = () => {
	// 	fetch('/removeCard', {
	// 		method: 'PUT',
	// 		headers: { 'Content-Type': 'application/json', },
	// 		body: JSON.stringify({
	// 			// name: formData, // Use your own property name / key
	// 			item: {
	// 				id: 2,
	// 				name: "milk"
	// 			}
	// 		}),
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => setCards(data))
	// 		.catch((err) => console.log(err))
	// }

	//   const handleSubmit = (event) => {
	// 	event.preventDefault()
	// 	saveGames() // Save games when form is submitted
	//   }

	return (
		<div>
			{cards ? (cards.map((card, i) =>
				<Card style={{ width: '18rem' }} key={i}>
					{/* <Card.Img variant="top" src="holder.js/100px180" /> */}
					<Card.Body>
						<Card.Title>{card.productName}</Card.Title>
						<Card.Text>{card.description}</Card.Text>
						{/* <Button variant="primary">Go somewhere</Button> */}
					</Card.Body>
				</Card>))
				: <></>
			}
		</div>
	);
}
