import { IProduct } from "./interface/IProduct"
import { v4 as uuidv4 } from 'uuid';

const curTime: Date = new Date()
export const productData: IProduct[] = [{
    productName: "Socks",
    description: "Warm and fuzzy socks.",
    creationTime: curTime,
    id: uuidv4(),
},
{
    productName: "Scarf",
    description: "A wool scarf.",
    creationTime: curTime,
    id: uuidv4(),
},
{
    productName: "Sweater",
    description: "The best time to wear a striped sweater is all the time.",
    creationTime: curTime,
    id: uuidv4(),
},
{
    productName: "Pants",
    description: "Cool Pants.",
    creationTime: curTime,
    id: uuidv4(),
},
{
    productName: "Shirt",
    description: "A cool T-shirt.",
    creationTime: curTime,
    id: uuidv4(),
},
{
    productName: "Hat",
    description: "Knit Beanie.",
    creationTime: curTime,
    id: uuidv4(),
},
]