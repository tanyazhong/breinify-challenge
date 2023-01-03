import { useState } from 'react';
import { Dropdown, Button, Modal } from 'react-bootstrap/';
import { IProduct } from '../../interface/IProduct';
import Form from '../Form/Form';
import './Header.css';

export function Header({ addProduct, ascending, setAscending, searchInput, setSearchInput }) {
	const [showAddModal, setShowAddModal] = useState(false);

	const handleShow = () => setShowAddModal(true);
	const handleClose = () => setShowAddModal(false);
	const handleSave = (formProduct: IProduct) => {
		addProduct(formProduct);
		handleClose();
	}

	const handleChange = (event) => {
		event.preventDefault();
		setSearchInput(event.target.value);
	};

	return (
		<div className='header'>
			{/* dropdown selects users  */}
			<div className="searchbar-container">
				<input className="form-control searchbar action" type="search"
					placeholder="Search" onChange={handleChange} value={searchInput}
				/>
			</div>
			<h1 className='title'>My Store</h1>
			<div className='header-action-buttons'>
				<Dropdown className='dropdown'>
					<Dropdown.Toggle className="header-button action"> {ascending ? "Oldest to Newest" : "Newest to Oldest"} </Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item onClick={() => { setAscending(false); }}>
							Newest to Oldest
						</Dropdown.Item>
						<Dropdown.Item onClick={() => { setAscending(true); }}>
							Oldest to Newest
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<Button className="header-button action" onClick={handleShow}>Add Product</Button>
			</div>

			{/* 'Add Product' modal */}
			<Modal show={showAddModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Product</Modal.Title>
				</Modal.Header>
				<Modal.Body><Form handleSave={handleSave} /></Modal.Body>
			</Modal>
		</div >
	);
}
