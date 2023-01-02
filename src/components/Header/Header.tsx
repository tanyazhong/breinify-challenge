import { useState } from 'react';
import { Dropdown, Button, Modal } from 'react-bootstrap/';
import './Header.css';

export function Header({ handleSorting, addProduct }: { handleSorting: (sortAscending: boolean) => void, addProduct: () => void }) {
	const [showAddModal, setShowAddModal] = useState(false);

	const handleShow = () => setShowAddModal(true);
	const handleClose = () => {
		setShowAddModal(false)
	}
	const handleSave = () => {
		addProduct()
		handleClose()
	}

	return (
		<div className='header'>
			{/* dropdown selects users  */}
			<h1 className='title'>My Store</h1>
			<div className='header-action-buttons'>
				<Dropdown className='dropdown'>
					<Dropdown.Toggle className="header-button"> Sort </Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item onClick={() => handleSorting(false)}>
							Newest to Oldest
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleSorting(true)}>
							Oldest to Newest
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<Button className="header-button" onClick={handleShow}>Add Product</Button>
			</div>

			{/* 'Add Product' modal */}
			<Modal show={showAddModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Product</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSave}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
