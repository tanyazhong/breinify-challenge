import { IProduct } from '../../interface/IProduct';
import { v4 as uuidv4 } from 'uuid';
import './Form.css';

interface FormProps {
    handleSave: (formProduct: IProduct) => void
    product?: IProduct | null
}

export const Form = ({ handleSave, product }: FormProps) => {
    const RANDOM_IMAGE_URL = "https://placekitten.com/700/500"; // get a cat image

    const onSubmit = (event) => {
        event.preventDefault();
        const newProduct: IProduct = {
            productName: event.target.name.value,
            description: event.target.description.value,
            creationTime: product ? product.creationTime : new Date(),
            productImg: product ? product.productImg : RANDOM_IMAGE_URL,
            id: product ? product.id : uuidv4(),
        }
        handleSave(newProduct);
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name" >Product Name</label>
                <input className="form-control" id="name" defaultValue={product ? product.productName : "Name"} />
            </div>

            <div className="form-group">
                <label htmlFor="description">Product Description</label>
                <input className="form-control" id="description"
                    defaultValue={product ? product.description : "Description"}
                />
            </div>
            <div className="form-group form-action-buttons">
                <button className="btn btn-primary" type="submit">
                    Save
                </button>
            </div>
        </form>
    );
};
export default Form;