import { IProduct } from "./interface/IProduct"
import { v4 as uuidv4 } from 'uuid';

const curTime: Date = new Date()
const RANDOM_IMAGE_URL: string = "https://picsum.photos/seed/picsum/536/354";

export const productData: IProduct[] = [
    {
        productName: "Hat",
        description: "Cute hat for a cute cat.",
        creationTime: curTime,
        productImg: RANDOM_IMAGE_URL,
        id: uuidv4(),
    },
    {
        productName: "Socks",
        description: "Warm and fuzzy socks.",
        creationTime: curTime,
        productImg: RANDOM_IMAGE_URL,
        id: uuidv4(),
    },
    {
        productName: "Scarf",
        description: "A wool scarf.",
        creationTime: curTime,
        productImg: RANDOM_IMAGE_URL,
        id: uuidv4(),
    },
    {
        productName: "Sweater",
        description: "The best time to wear a striped sweater is all the time.",
        creationTime: curTime,
        productImg: RANDOM_IMAGE_URL,
        id: uuidv4(),
    },
    {
        productName: "Pants",
        description: "Cool Pants.",
        creationTime: curTime,
        productImg: RANDOM_IMAGE_URL,
        id: uuidv4(),
    },
    {
        productName: "Shirt",
        description: "A cool T-shirt.",
        creationTime: curTime,
        productImg: RANDOM_IMAGE_URL,
        id: uuidv4(),
    },

]