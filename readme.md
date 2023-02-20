# Store API

[store-api](https://bitter-hill-3387.fly.dev/api) is a REST API built to serve
[Peculiar stores](https://peculiar-store.vercel.app/). This is built with
[express.js](https://expressjs.com/en/5x/api.html) (a lightweight
[node.js](https://nodejs.org/en/docs/) framework) and [mongoose](https://mongoosejs.com/docs/) (a
[MongoDB](https://docs.mongodb.com/) ODM).

## Resources

There are three main resources:

-  Auth
-  Product
-  Cart

### Auth

The authentication resource has 2 main endpoints

-  Register <https://bitter-hill-3387.fly.dev/api/auth/register>
-  Login <https://bitter-hill-3387.fly.dev/api/auth/login>

#### Register

This is done by making a post request to <https://bitter-hill-3387.fly.dev/api/auth/register>. The
request body can hold firstName, lastName, email, username, password, address, city, postalCode and
country fields. The firstName, lastName, email, username & password fields are required. If they are
absent, a 400 error is returned.

```js
fetch("https://bitter-hill-3387.fly.dev/auth/register", {
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

This is done by making a post request to <https://bitter-hill-3387.fly.dev/api/auth/login>. The
request body must hold the username & password. If either is missing, a 400 error is returned. If
the user does not exist on the database or if the password is incorrect, a 401 error is returned.
The firstName, lastName, email, username & password fields are required. If they are absent, a 400
error is returned.

```js
fetch("https://bitter-hill-3387.fly.dev/api/auth/login", {
	method: "POST",
	body: JSON.stringify({
		username: "sample username",
		password: "sample password",
	}),
})
	.then(res => res.json())
	.then(json => console.log(json))
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

-  Get all products <https://bitter-hill-3387.fly.dev/api/products/>
-  Get all categories <https://bitter-hill-3387.fly.dev/api/products/categories>
-  Get single product <https://bitter-hill-3387.fly.dev/api/products/single/>:\_id
-  Get product in category <https://bitter-hill-3387.fly.dev/api/products/categories/>:category
-  Get search item <https://bitter-hill-3387.fly.dev/api/products/search/>:searchValue

#### Get all products

This endpoint returns all the products in the database. A get request is made to
<https://bitter-hill-3387.fly.dev/api/products/>.

```js
fetch("https://bitter-hill-3387.fly.dev/api/products")
	.then(res => res.json())
	.then(json => console.log(json))
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

This endpoint returns all the product categories. A get request is made to
<https://bitter-hill-3387.fly.dev/api/products/categories/>.

```js
fetch("https://bitter-hill-3387.fly.dev/api/products/categories")
	.then(res => res.json())
	.then(json => console.log(json))
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

This endpoint returns the product whose id was passed in as a parameter. A get request is made to
<https://bitter-hill-3387.fly.dev/api/products/single>:\_id with the product_id replacing the \_id
parameter.

```js
fetch("https://bitter-hill-3387.fly.dev/api/products/single/sampleid")
	.then(res => res.json())
	.then(json => console.log(json))
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

A get request is made to <https://bitter-hill-3387.fly.dev/api/products/categories/>:category with
the filter category replacing the category parameter.

```js
fetch("https://bitter-hill-3387.fly.dev/api/products/categories/samplecategory")
	.then(res => res.json())
	.then(json => console.log(json))
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

This endpoint returns all products whose title matches the term being searched for. A get request is
made to <https://bitter-hill-3387.fly.dev/api/products/search/>:searchValue with the letter/word to
be searched for replacing searchValue,

```js
fetch("https://bitter-hill-3387.fly.dev/api/products/search/samplesearchValue")
	.then(res => res.json())
	.then(json => console.log(json))
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

-  Get all products in a user's cart <https://bitter-hill-3387.fly.dev/api/cart/>
-  Add product to a user's cart <https://bitter-hill-3387.fly.dev/api/cart/>
-  Delete product from a user's cart <https://bitter-hill-3387.fly.dev/api/cart/delete/>:product_id
-  Delete all products from a user's cart <https://bitter-hill-3387.fly.dev/api/cart/delete_all/>
-  Increment cart item <https://bitter-hill-3387.fly.dev/api/cart/increment/>
-  Decrement cart item <https://bitter-hill-3387.fly.dev/api/cart/decrement/>
-  Checkout <https://bitter-hill-3387.fly.dev/api/cart/checkout/>
-  Checkout callback <https://bitter-hill-3387.fly.dev/api/cart/paystack/checkout/>
-  Place order <https://bitter-hill-3387.fly.dev/api/cart/checkout/shipping/>

#### Get all products in a user's cart

This endpoint returns all the products in the cart of a specific user. A get request is made to
<https://bitter-hill-3387.fly.dev/api/cart/>. As this is a protected route, the JWT token must be
included in the request header as shown below. If absent, a 400 error is returned. if there are no
products in the user's cart, the products array would be empty and the count would be 0.

```js
axios
	.post("https://bitter-hill-3387.fly.dev/api/cart/", {
		headers: {
			authorization: "Bearer sample-jwt-token",
		},
	})
	.then(res => res.json())
	.then(json => console.log(json))
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

This endpoint is used to add a single product to the user's cart. A post request is made to
<https://bitter-hill-3387.fly.dev/api/cart/>. The \_id of the product to be added to the user cart
is held in the request body under the product_id field. As this is a protected route, the JWT token
must be included in the request header as shown below. If absent, a 400 error is returned.

```js
axios
	.post(
		"https://bitter-hill-3387.fly.dev/api/cart/",
		{ product_id: sample_id },
		{
			headers: {
				authorization: "Bearer sample-jwt-token",
			},
		}
	)
	.then(res => res.json())
	.then(json => console.log(json))
```

Will return

```json
[
   {
      "_id": "sample_id",
      "user_id": "sample user_id",
      "count": "total number of items in the cart + 1",
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
            "quantity": "number of sample products in the cart +" 1,
            "_id": "sample _id",
            "created_at": "time sample product was added to cart"
         }
      ],
      "__v": 0
   }
]
```

#### Delete product to a user's cart

This endpoint is used to delete a single product from the user's cart. A delete request is made to
<https://bitter-hill-3387.fly.dev/api/cart/delete/>:product_id, with the \_id of the product to be
deleted from the user cart replacing the product_id parameter. As this is a protected route, the JWT
token must be included in the request header as shown below. If absent, a 400 error is returned.

```js
axios
	.delete("https://bitter-hill-3387.fly.dev/api/cart/delete/sample_product_id", {
		headers: {
			authorization: "Bearer sample-jwt-token",
		},
	})
	.then(res => res.json())
	.then(json => console.log(json))
```

Will return

```json
[
	{
		"_id": "sample_id",
		"user_id": "sample user_id",
		"count": 0,
		"products": [],
		"__v": 0
	}
]
```

#### Delete all the products in a user's cart

This endpoint is used to delete all the products in the user's cart. A delete request is made to
<https://bitter-hill-3387.fly.dev/api/cart/delete_all/>. As this is a protected route, the JWT token
must be included in the request header as shown below. If absent, a 400 error is returned.

```js
axios
	.delete("https://bitter-hill-3387.fly.dev/api/cart/delete_all/", {
		headers: {
			authorization: "Bearer sample-jwt-token",
		},
	})
	.then(res => res.json())
	.then(json => console.log(json))
```

Will return

```json
[
	{
		"_id": "sample_id",
		"user_id": "sample user_id",
		"count": 0,
		"products": [],
		"__v": 0
	}
]
```

#### Increment cart item

This endpoint is used to increase the quantity of a single product in the cart. A patch request is
made to <https://bitter-hill-3387.fly.dev/api/cart/increment/>. The \_id of the product to be added
to the user cart is held in the request body under the product_id field. As this is a protected
route, the JWT token must be included in the request header as shown below. If absent, a 400 error
is returned.

```js
axios
	.patch(
		"https://bitter-hill-3387.fly.dev/api/cart/increment/",
		{
			product_id: "sample_product_id",
		},
		{
			headers: {
				authorization: "Bearer sample-jwt-token",
			},
		}
	)
	.then(res => res.json())
	.then(json => console.log(json))
```

Will return

```json
[
   {
      "_id": "sample_id",
      "user_id": "sample user_id",
      "count": "total number of items in the cart + 1",
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
            "quantity": "number of sample products in the cart +" 1,
            "_id": "sample _id",
            "created_at": "time sample product was added to cart"
         }
      ],
      "__v": 0
   }
]
```

#### Decrement cart item

This endpoint is used to decrease the quantity of a single product in the cart. A patch request is
made to <https://bitter-hill-3387.fly.dev/api/cart/decrement/>. The \_id of the product to be added
to the user cart is held in the request body under the product_id field. As this is a protected
route, the JWT token must be included in the request header as shown below. If absent, a 400 error
is returned.If the quantity of the item being decremented is 0, the item is removed from the cart.

```js
axios
	.patch(
		"https://bitter-hill-3387.fly.dev/api/cart/decrement/",
		{
			product_id: "sample_product_id",
		},
		{
			headers: {
				authorization: "Bearer sample-jwt-token",
			},
		}
	)
	.then(res => res.json())
	.then(json => console.log(json))
```

Will return

```json
[
   {
      "_id": "sample_id",
      "user_id": "sample user_id",
      "count": "total number of items in the cart - 1",
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
            "quantity": "number of sample products in the cart -" 1,
            "_id": "sample _id",
            "created_at": "time sample product was added to cart"
         }
      ],
      "__v": 0
   }
]
```

#### Checkout

This endpoint is used to initialize payment on Paystack. A post request is made to
<https://bitter-hill-3387.fly.dev/api/cart/checkout/>. The request body contains the total price of
the items in a cart, the email, phone number and full name of the customer. As this is a protected
route, the JWT token must be included in the request header as shown below. If absent, a 400 error
is returned.

```js
axios
	.post(
		"https://bitter-hill-3387.fly.dev/api/cart/checkout/",
		{
			amount: "sample_amount",
			email: "sample_email",
			fullName: "sample_full_name",
			phoneNumber: "sample_phone_number",
		},
		{
			headers: {
				authorization: "Bearer sample-jwt-token",
			},
		}
	)
	.then(res => res.json())
	.then(json => console.log(json))
```

Will return

```json
[{ "url": "sample_authorization_url" }]
```

#### Checkout callback

This endpoint is used to verify payment on Paystack. A get request is made to
<=https://bitter-hill-3387.fly.dev/api/cart/paystack/checkout/>. The request query contains the
paystack reference. As this is a protected route, the JWT token must be included in the request
header as shown below. If absent, a 400 error is returned.

```js
axios
	.get(
		"https://bitter-hill-3387.fly.dev/api/cart/paystack/checkout/",

		{
			headers: {
				authorization: "Bearer sample-jwt-token",
			},
		}
	)
	.then(res => res.json())
	.then(json => console.log(json))
```

Will return

```json
[{ "url": "sample_authorization_url" }]
```

#### Place order

This endpoint is used to place the user's order. A post request is made to
<https://bitter-hill-3387.fly.dev/api/cart/checkout/shipping/>. The request body contains the
shipping details of the user. As this is a protected route, the JWT token must be included in the
request header as shown below. If absent, a 400 error is returned.

```js
axios
   .post(
      "https://bitter-hill-3387.fly.dev/api/cart/checkout/shipping/",
      {
       address:"sample_address",
       city:"sample_city",
       postalCode:"sample_postal_code", country"sample_country" },
      {
         headers: {
            authorization: "Bearer sample-jwt-token",
         },
      }
   )
   .then((res) => res.json())
   .then((json) => console.log(json));
```

Will return

```json

```

## Feedback!!

I'd love your feedback on the API. You can reach me via [email](mailto:chinaemerema@gmail.com) or
give me a shout out on [twitter](https://twitter.com/femto_ace?t=nk6ylNm1Zp2l0yiJkCKFeA&s=09)
