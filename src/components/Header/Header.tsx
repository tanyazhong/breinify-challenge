import { Dropdown, Button } from 'react-bootstrap/';
import './Header.css';

export function Header({ handleSorting, addProduct }: { handleSorting: (sortAscending: boolean) => void, addProduct: () => void }) {


	return (
		<div className='header'>
			{/* dropdown selects users  */}
			<Dropdown className='dropdown'>
				<Dropdown.Toggle className='dropdown-toggle'> Sort </Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item onClick={() => handleSorting(false)}>
						Newest to Oldest
					</Dropdown.Item>
					<Dropdown.Item onClick={() => handleSorting(true)}>
						Oldest to Newest
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			<Button onClick={addProduct}>Add</Button>
		</div>

	);
}
