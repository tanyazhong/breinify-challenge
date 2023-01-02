import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap/';
import { IProduct } from '../../interface/IProduct';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import { productData } from '../../productData';
import { Header } from '../Header/Header';
import './Dashboard.css';

export function Dashboard() {
	const [products, setProducts] = useState<IProduct[]>([])
	const [ascending, setAscending] = useState(true)

	// get a compare fn for products depending on 'ascending' state
	const getCompareFn = (a: IProduct, b: IProduct) => {
		if (ascending) { return a.creationTime < b.creationTime ? - 1 : a.creationTime > b.creationTime ? 1 : 0 }
		else { return a.creationTime > b.creationTime ? -1 : a.creationTime < b.creationTime ? 1 : 0 }
	}

	// on render, init db with some product data, sort data then update 'products' state
	useEffect(() => {
		try {
			fetch('/initProducts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', },
				body: JSON.stringify({ products: productData }),
			})
				.then((res) => res.json())
				.then((data) => setProducts((data.products as IProduct[]).sort(getCompareFn)))
				.catch((err) => console.log(err))
		}
		catch (error) { console.log(error) }
	}, []);

	// console log 'products' state changes
	useEffect(() => {
		console.log(products);
	}, [products]);

	// Control sorting from child component
	const handleSorting = (sortAscending: boolean) => {
		if (sortAscending !== ascending) { setAscending(sortAscending); }
	}

	// when 'ascending' state changes, sort the products
	useEffect(() => {
		const sorted = [...products].reverse();
		setProducts(sorted);
	}, [ascending]);

	// const getProducts = () => {
	// 	fetch('/getProducts')
	// 		.then((res) => res.json())
	// 		.then(data => {
	// 			setProducts((data.products as IProduct[]).sort(getCompareFn))
	// 		})
	// 		.catch((err) => console.log(err))
	// }

	const addProduct = () => {
		fetch('/addProduct', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', },
			body: JSON.stringify({
				item: {
					productName: "YEAH",
					description: "A wool scarf.",
					creationTime: new Date(),
					productImg: "https://placekitten.com/700/500",
					id: 5,
				},
			}),
		})
			.then((res) => res.json())
			.then((data) => setProducts((data.products as IProduct[]).sort(getCompareFn)))
			.catch((err) => console.log(err))
	}

	const updateProduct = () => {
		fetch('/updateProduct', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', },
			body: JSON.stringify({
				item: {
					id: 2,
					name: "milk"
				}
			}),
		})
			.then((res) => res.json())
			.then((data) => setProducts((data.products as IProduct[]).sort(getCompareFn)))
			.catch((err) => console.log(err))
	}

	const deleteProduct = (id: string) => {
		fetch('/deleteProduct', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json', },
			body: JSON.stringify({ id: id }),
		})
			.then((res) => res.json())
			.then((data) => setProducts((data.products as IProduct[])))
			.catch((err) => console.log(err))
	}

	//   const handleSubmit = (event) => {
	// 	event.preventDefault()
	// 	saveGames() // Save games when form is submitted
	//   }

	//TODO: IMPLEMENT add and edit. update readme with notes and description of implementation
	return (
		<div>
			<Header handleSorting={handleSorting} addProduct={addProduct} />
			<div className='card-container'>
				{products.length > 0 ? (products.map((product, i) =>
					<Card className='card' key={i}>
						<Card.Img variant="top" src={product.productImg} />
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
		</div>
	);
}
