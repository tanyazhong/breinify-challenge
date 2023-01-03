import { useState, useEffect } from 'react';
import { Card, Modal } from 'react-bootstrap/';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import { dummyProductData } from '../../dummyProductData';
import { Header } from '../Header/Header';
import { IProduct } from '../../interface/IProduct';
import Form from '../Form/Form';
import './Dashboard.css';

export function Dashboard() {
	const [products, setProducts] = useState<IProduct[]>([])
	const [ascending, setAscending] = useState(false)
	const [searchInput, setSearchInput] = useState('');
	const [showEditModal, setShowEditModal] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);

	// functions for controlling 'edit' modal 
	const handleShow = (product) => {
		setShowEditModal(true);
		setEditingProduct(product);
	};
	const handleClose = () => setShowEditModal(false);
	const handleSave = (formProduct: IProduct) => {
		updateProduct(formProduct);
		handleClose();
	}

	// returns a compare fn for products depending on 'ascending' state
	const getCompareFn = (a: IProduct, b: IProduct) => {
		if (ascending) { return a.creationTime < b.creationTime ? - 1 : a.creationTime > b.creationTime ? 1 : 0 }
		else { return a.creationTime > b.creationTime ? -1 : a.creationTime < b.creationTime ? 1 : 0 }
	}

	// on render, init db with dummy product data, sort data, then update 'products' state
	useEffect(() => {
		try {
			fetch('/initProducts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', },
				body: JSON.stringify({ products: dummyProductData }),
			})
				.then((res) => res.json())
				.then((data) => setProducts(data.products as IProduct[]))
				.catch((err) => console.log(err))
		}
		catch (error) { console.log(error) }
	}, []);

	// console log 'products' state changes
	useEffect(() => {
		console.log(products);
	}, [products]);

	// this function is not currently used since 
	// we get the data in response when send a post requist for the dummy data 
	// if we stop using dummy data from the frontend we can call this function.
	const getProducts = () => {
		fetch('/getProducts')
			.then((res) => res.json())
			.then(data => {
				setProducts(data.products as IProduct[])
			})
			.catch((err) => console.log(err))
	}

	const addProduct = (product: IProduct) => {
		fetch('/addProduct', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', },
			body: JSON.stringify({ item: product, }),
		})
			.then((res) => res.json())
			.then((data) => setProducts(data.products as IProduct[]))
			.catch((err) => console.log(err))
	}

	const updateProduct = (product: IProduct) => {
		fetch('/updateProduct', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', },
			body: JSON.stringify({ item: product, }),
		})
			.then((res) => res.json())
			.then((data) => setProducts(data.products as IProduct[]))
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

	return (
		<>
			<Header ascending={ascending} setAscending={setAscending} addProduct={addProduct}
				searchInput={searchInput} setSearchInput={setSearchInput} />
			{/* Filter, Sort, and Display cards */}
			<div className='card-container'>
				{products.length > 0 ?
					(products.filter((p) => p.productName.match(searchInput)).sort(getCompareFn)
						.map((product, i) =>
							<Card className='card' key={i}>
								<Card.Img variant="top" src={product.productImg} />
								<Card.Body>
									<Card.Title>{product.productName}</Card.Title>
									<Card.Text>{product.description}</Card.Text>
									<div className='action-buttons'>
										<button aria-label="Edit" className="button" onClick={() => handleShow(product)}>
											<div className="button-icon"><FaPencilAlt /></div>
										</button>
										<button aria-label="Delete" className="button" onClick={() => deleteProduct(product.id)}>
											<div className="button-icon"><FaTrashAlt /></div>
										</button>
									</div>
								</Card.Body>
							</Card>))
					: <></>
				}
			</div>
			{/* 'Edit Product' modal */}
			<Modal show={showEditModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Product</Modal.Title>
				</Modal.Header>
				<Modal.Body><Form handleSave={handleSave} product={editingProduct} /></Modal.Body>
			</Modal>
		</>
	);
}
