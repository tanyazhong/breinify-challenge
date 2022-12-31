import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap/';
import { IProduct } from '../../interface/IProduct';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import { productData } from '../../productData';
import './Dashboard.css';

export function Dashboard() {
	const [products, setProducts] = useState<IProduct[]>([])

	useEffect(() => {
		// init db with some product data
		try {
			fetch('/initProducts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', },
				body: JSON.stringify({ products: productData }),
			})
				.then((res) => res.json())
				.then((data) => setProducts(data.products as IProduct[]))
				.catch((err) => console.log(err))
		}
		catch (error) { console.log(error) }
	}, []);

	useEffect(() => {
		console.log(products)
	}, [products]);

	// const getProduct = () => {
	// 	fetch('/getProduct')
	// 		.then((res) => res.json())
	// 		.then(data => {
	// 			setProducts(data.products)
	// 		})
	// 		.catch((err) => console.log(err))
	// }

	const addProduct = () => {
		fetch('/addProduct', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', },
			body: JSON.stringify({
				// name: formData, // Use your own property name / key
				item: {
					productName: "Scarf",
					description: "A wool scarf.",
					creationTime: 5,
					id: 5,
				},
			}),
		})
			.then((res) => res.json())
			.then((data) => setProducts(data.products as IProduct[]))
			.catch((err) => console.log(err))
	}

	// const updateProduct = () => {
	// 	fetch('/updateProduct', {
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
	// 		.then((data) => setProducts(data))
	// 		.catch((err) => console.log(err))
	// }

	const deleteProduct = (id: string) => {
		fetch('/deleteProduct', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json', },
			body: JSON.stringify({ id: id }),
		})
			.then((res) => res.json())
			.then((data) => setProducts(data.products as IProduct[]))
			.catch((err) => console.log(err))
	}

	//   const handleSubmit = (event) => {
	// 	event.preventDefault()
	// 	saveGames() // Save games when form is submitted
	//   }

	return (
		<div>
			{products.length > 0 ? (products.map((product, i) =>
				<Card className='card' key={i}>
					{/* <Card.Img variant="top" src="holder.js/100px180" /> */}
					<Card.Body>
						<Card.Title>{product.productName}</Card.Title>
						<Card.Text>{product.description}</Card.Text>
						<div className='action-buttons'>
							<button className="button" onClick={() => deleteProduct(product.id)}>
								<div className="button-icon"><FaPencilAlt /></div>
							</button>
							<button className="button" onClick={() => deleteProduct(product.id)}>
								<div className="button-icon"><FaTrashAlt /></div>
							</button>
						</div>
					</Card.Body>
				</Card>))
				: <></>
			}
		</div>
	);
}
