# Breinify Code Challenge

### Introduction:

You will be creating a full stack web application using Node with Express as the backend and React with React-Bootstrap as the frontend to manage a store's mechandise.

### Requirements:

#### Backend Requirements

1. Create an Express server that:
    - GET: Reads and returns the content from redis.
    - POST: Creates a new product and writes it to redis, and returns the newly created product content.
    - PUT: Updates a product and writes it to redis, and returns the updated product content.
    - DELETE: Deletes the product from redis, and returns the delete product content.

#### Frontend Requirements

1. A dashboard to show the following in a Product card:
    - Product Image ( should be a random image ) `productImg`
    - Product Name `productName`
    - Description `description`
    - Creation Time `creationTime`
2. A filter feature to filter the cards by the product name.
3. A sorting feature to sort the cards by their `creationTime` in either acsending or desending order.
4. Add a button to create a new card.
5. Add a button to delete an existing card.
6. Add an edit feature to change the card's name (`productName`) and image (`productImg`)
    > NOTE: Create, edit and delete should fire an AJAX call that will save the data into redis on the Node server.

#### Environment Requirements
1. NPM version: `8.1.2`
2. Node version: `v16.13.1`

### Pre-Requirements

1. Please be sure to download [redis](https://download.redis.io/releases/redis-5.0.14.tar.gz). We will be using `redis` to store our cards in the backend.
    - Start up the `redis-server` on the default port: `6379`

### How to run
1. `cd` into the `breinify-frontend-challenge` folder
2. Run `npm run fresh` 
    - We will be using this command to start your project!
    - This downloads the necessary dependencies and starts the server (backend) and client (frontend)

### Technologies Available:

-   AJAX calls: `axios` or `fetch`
-   Helper components: `react-bootstrap`
-   Styling: `styled-components` or `sass`
-   You can add other libraries on top of these as well.

### Time Limit:

You will have 1 week to finish this challenge. Once you finish, please push your challenge to Github and share the repository link with us.

### Nice to have:

* Add unit tests
* Write your challenge in typescript (BIG PLUS)!
* Show us your creativity! 

### Additional Information:

We added a `"proxy": "http://localhost:5001"` into package.json to help clean up endpoint calls.

## Notes
This is my implementation of the product card dashboard. The backend has the GET, POST, PUT, and DELETE endpoints mentioned in the requirements
as well as an endpoint to POST multiple products to redis, which I used to initialize redis with dummy product data passed from the frontend.
The frontend displays the product cards. The dashboard's header features a searchbar, a dropdown for sorting cards by creation date, and a button to add a new product (Note that all the products in the dummy data have the same creation time so please add a product to see the sorting :)). Each card has an edit and delete button. Clicking on the add or edit button opens a form popup that prompts the user for a new product name and description.

Here are some improvements I want to make in the future:
1. Better backend and frontend error checking: Currently, errors on the backend get console logged. The frontend add and edit forms could use some validation (ex: preventing empty string from being the product's name and description)
2. Unit Testing
3. Search improvements: Currently, search is case sensitive so it would be nice if it were case insensitive. Also, with the current implementation, entering an invalid regular expression such as '?' in the searchbar breaks the app so the input needs to be sanitized.
4. Option to display products in a grid or column
5. Ability to upload an image instead of using placeholder images of a mountain and a cat