import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

export function Dashboard() {
	const [cardData, setCardData] = useState({})


	useEffect(() => {
		fetch('/getCards')
			.then((res) => res.json())
			.then(data => {
				console.log(data)
				setCardData(data)
			})
			.catch((err) => console.log(err))
		addProduct()
	}, []);


	const addProduct = () => {
		fetch('/addCard', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				// name: formData, // Use your own property name / key
				item: {
					name: "cheese"
				}
			}),
		})
			.then((res) => res.json())
			.then((data) => setCardData(data))
			.catch((err) => console.log(err))
	}

	//   const handleSubmit = (event) => {
	// 	event.preventDefault()
	// 	saveGames() // Save games when form is submitted
	//   }

	return (
		<div>
			<Card style={{ width: '18rem' }}>
				{/* <Card.Img variant="top" src="holder.js/100px180" /> */}
				<Card.Body>
					<Card.Title>Card Title</Card.Title>
					<Card.Text>
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</Card.Text>
					{/* <Button variant="primary">Go somewhere</Button>f */}
				</Card.Body>
			</Card>
		</div>
		// {this.props.cart.map((item, i) => <Product key={i} {...item}  onBtnClick={this.props.removeItemHandler} btnText="Remove Item" /> )}
	);
}
