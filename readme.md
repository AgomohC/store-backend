# Store API

[store-api](https://peculiar-store-api.herokuapp.com/) is a REST API built to serve [Peculiar stores](https://peculiar-store.vercel.app/). This is built with [express.js](https://expressjs.com/en/5x/api.html) (a lightweight [node.js](https://nodejs.org/en/docs/) framework) and [mongoose](https://mongoosejs.com/docs/) (a [MongoDB](https://docs.mongodb.com/) ODM).

## Resources

There are three main resources:

-  Auth
-  Product
-  Cart

### Auth

The authentication resource has 2 main endpoints

-  Register <https://peculiar-store-api.herokuapp.com/api/auth/register>
-  Login <https://peculiar-store-api.herokuapp.com/api/auth/login>

#### Register

This is done by making a post request to <https://peculiar-store-api.herokuapp.com/api/auth/register>. The request body can hold firstName, lastName, email, username, password, address, city, postalCode and country fields.
The firstName, lastName, email, username & password fields are required. If they are absent, a 400 error is returned.

```js
fetch("https://peculiar-store-api.herokuapp.com/api/auth/register", {
   method: "POST",
   body: JSON.stringify({
      firstName "sample first name",
      lastName: "sample last name",
      email: "sample email",
      username: "sample username",
      password: "sample password",

   }),
})
   .then((res) => res.json())
   .then((json) => console.log(json));


```

Will return

```json
{
   "user": {
      "firstName": "sample first name",
      "lastName": "sample last name",
      "email": "sample email",
      "username": "sample username"
   },
   "token": "jwt"
}
```

#### Login

This is done by making a post request to <https://peculiar-store-api.herokuapp.com/api/auth/login>. The request body must hold the username & password. If either is missing, a 400 error is returned. If the user does not exist on the database or if the password is incorrect, a 401 error is returned.
The firstName, lastName, email, username & password fields are required. If they are absent, a 400 error is returned.

```js
fetch("https://peculiar-store-api.herokuapp.com/api/auth/login", {
   method: "POST",
   body: JSON.stringify({
      username: "sample username",
      password: "sample password",
   }),
})
   .then((res) => res.json())
   .then((json) => console.log(json));
```

Will return

```json
{
   "user": {
      "firstName": "sample first name",
      "lastName": "sample last name",
      "email": "sample email",
      "username": "sample username",
      "_id": "sample _id"
   },
   "token": "jwt"
}
```

### Product

The product resource has 5 endpoints

-  Get all products <https://peculiar-store-api.herokuapp.com/api/products/>
-  Get all categories <https://peculiar-store-api.herokuapp.com/api/products/categories>
-  Get single product <https://peculiar-store-api.herokuapp.com/api/products/single/>:\_id
-  Get product in category <https://peculiar-store-api.herokuapp.com/api/products/categories/>:category
-  Get search item <https://peculiar-store-api.herokuapp.com/api/products/search/>:searchValue

#### Get all products

This endpoint returns all the products in the database. A get request is made to <https://peculiar-store-api.herokuapp.com/api/products/>.

```js
fetch("https://peculiar-store-api.herokuapp.com/api/products")
   .then((res) => res.json())
   .then((json) => console.log(json));
```

Will return

```json
[
   {
      "title": "sample title",
      "price": "sample price",
      "description": "sample description",
      "category": "sample category",
      "image": "sample image url"
   },
   {
      "title": "sample title",
      "price": "sample price",
      "description": "sample description",
      "category": "sample category",
      "image": "sample image url"
   },
   {
      "title": "sample title",
      "price": "sample price",
      "description": "sample description",
      "category": "sample category",
      "image": "sample image url"
   },
   {
      "title": "sample title",
      "price": "sample price",
      "description": "sample description",
      "category": "sample category",
      "image": "sample image url"
   }
]
```

#### Get all categories

This endpoint returns all the product categories. A get request is made to <https://peculiar-store-api.herokuapp.com/api/products/categories/>.

```js
fetch("https://peculiar-store-api.herokuapp.com/api/products/categories")
   .then((res) => res.json())
   .then((json) => console.log(json));
```

Will return

```json
{
   "categories": [
      "sample category",
      "sample category",
      "sample category",
      "sample category",
      "sample category"
   ]
}
```

#### Get single product

This endpoint returns the product whose id was passed in as a parameter. A get request is made to <https://peculiar-store-api.herokuapp.com/api/products/single>:\_id with the product_id replacing the \_id parameter.

```js
fetch("https://peculiar-store-api.herokuapp.com/api/products/single/sampleid")
   .then((res) => res.json())
   .then((json) => console.log(json));
```

Will return

```json
[
   {
      "title": "sample title",
      "price": "sample price",
      "description": "sample description",
      "category": "sample category",
      "image": "sample image url"
   }
]
```

#### Get product in category

A get request is made to <https://peculiar-store-api.herokuapp.com/api/products/categories/>:category with the filter category replacing the category parameter.

```js
fetch(
   "https://peculiar-store-api.herokuapp.com/api/products/categories/samplecategory"
)
   .then((res) => res.json())
   .then((json) => console.log(json));
```

Will return

```json
[
   {
      "title": "sample title",
      "price": "sample price",
      "description": "sample description",
      "category": "samplecategory",
      "image": "sample image url"
   },
   {
      "title": "sample title",
      "price": "sample price",
      "description": "sample description",
      "category": "samplecategory",
      "image": "sample image url"
   },
   {
      "title": "sample title",
      "price": "sample price",
      "description": "sample description",
      "category": "samplecategory",
      "image": "sample image url"
   }
]
```

#### Get search item

This endpoint returns all products whose title matches the term being searched for. A get request is made to <https://peculiar-store-api.herokuapp.com/api/products/search/>:searchValue with the letter/word to be searched for replacing searchValue,

```js
fetch(
   "https://peculiar-store-api.herokuapp.com/api/products/search/samplesearchValue"
)
   .then((res) => res.json())
   .then((json) => console.log(json));
```

Will return

```json
[
   {
      "title": "sample title",
      "price": "sample price",
      "description": "sample description",
      "category": "sample category",
      "image": "sample image url"
   }
]
```

### Cart

The cart resource has 9 endpoints

-  Get all products in a user's cart <https://peculiar-store-api.herokuapp.com/api/cart/>
-  Add product to a user's cart <https://peculiar-store-api.herokuapp.com/api/cart/>
-  Delete product from a user's cart <https://peculiar-store-api.herokuapp.com/api/cart/delete/>:product_id
-  Delete all products from a user's cart <https://peculiar-store-api.herokuapp.com/api/cart/delete_all/>
-  Increment cart item <https://peculiar-store-api.herokuapp.com/api/cart/increment/>
-  Decrement cart item <https://peculiar-store-api.herokuapp.com/api/cart/decrement/>
-  Checkout <https://peculiar-store-api.herokuapp.com/api/cart/checkout/>
-  Checkout callback <https://peculiar-store-api.herokuapp.com/api/cart/paystack/checkout/>
-  Place order <https://peculiar-store-api.herokuapp.com/api/cart/checkout/shipping/>

#### Get all products in a user's cart

This endpoint returns all the products in the cart of a specific user. A get request is made to <https://peculiar-store-api.herokuapp.com/api/cart/>.

```js
axios
   .post("https://peculiar-store-api.herokuapp.com/api/cart/", {
      headers: {
         authorization: "Bearer sample-jwt-token",
      },
   })
   .then((res) => res.json())
   .then((json) => console.log(json));
```

Will return

```json
[
   {
      "_id": "sample_id",
      "user_id": "sample user_id",
      "count": "total number of items in the cart",
      "products": [
         {
            "product_id": {
               "_id": "sample product_id",
               "title": "sample product _id",
               "price": "sample product price",
               "description": "Sample product description",
               "category": "sample product category",
               "image": "sample product image"
            },
            "quantity": "number of sample products in the cart",
            "_id": "sample _id",
            "created_at": "time sample product was added to cart"
         }
      ],
      "__v": 0
   }
]
```

#### Add product to a user's cart

This endpoint is used to add a single product to the user's cart. A get request is made to <https://peculiar-store-api.herokuapp.com/api/cart/>.

```js
axios
   .post("https://peculiar-store-api.herokuapp.com/api/cart/", {
      headers: {
         authorization: "Bearer sample-jwt-token",
      },
   })
   .then((res) => res.json())
   .then((json) => console.log(json));
```

Will return

```json
[
   {
      "_id": "sample_id",
      "user_id": "sample user_id",
      "count": "total number of items in the cart",
      "products": [
         {
            "product_id": {
               "_id": "sample product_id",
               "title": "sample product _id",
               "price": "sample product price",
               "description": "Sample product description",
               "category": "sample product category",
               "image": "sample product image"
            },
            "quantity": "number of sample products in the cart",
            "_id": "sample _id",
            "created_at": "time sample product was added to cart"
         }
      ],
      "__v": 0
   }
]
```
