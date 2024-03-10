# A SIMPLE MARKETPLACE LIKE API

<table>
<tr>
<td>
In this API, you can Register New User, Update User, Delete User, Find single User, Find All Users, Add Item, Update Item, Delete Item, Find Item, Find All Items with permissions
</td>
</tr>
</table>

### Development

Want to contribute? Great!

To fix a bug or enhance an existing module, follow these steps:

-   Fork the repo
-   Create a new branch (`git checkout -b improve-feature`)
-   Make the appropriate changes in the files
-   Add changes to reflect the changes made
-   Commit your changes (`git commit -am 'Improve feature'`)
-   Push to the branch (`git push origin improve-feature`)
-   Create a Pull Request

## Built with

-   [ExpressJs](https://expressjs.com/) - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

-   [MongooseJs - MongoDB](https://mongoosejs.com/) - Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

-   [NodeJs](https://nodejs.org/en) - Node.js® is an open-source, cross-platform JavaScript runtime environment.

## Installation

```sh
npm install
```

## Create and add following in the .env file

1. Add MongoDB connection string as MONGO_URI
2. Add jwt secret as JWT_SECRET
3. Add jwt expirty as JWT_EXPIRY
4. Add port as PORT

```sh
npm run dev
```

## Routes

-   [Register - POST](http://localhost:5100/api/v1/auth/register)
-   [Login - POST](http://localhost:5100/api/v1/auth/login)
-   [Logout - GET](http://localhost:5100/api/v1/auth/logout)
-   [Update User - PATCH](http://localhost:5100/api/v1/users/update-user)
-   [Get All Users - GET](http://localhost:5100/api/v1/users/get-users)
-   [Get Current User - GET](http://localhost:5100/api/v1/users/current-user)
-   [Delete User - DELETE](http://localhost:5100/api/v1/admin/delete/:id)
-   [Application Stats - GET](http://localhost:5100/api/v1/admin/stats)
-   [Add Item - POST](http://localhost:5100/api/v1/items/)
-   [Get Item - GET](http://localhost:5100/api/v1/items/:id)
-   [Get All Items - GET](http://localhost:5100/api/v1/items/)
-   [Update Item - PATCH](http://localhost:5100/api/v1/items/:id)
-   [Delete Item - DELETE ](http://localhost:5100/api/v1/items/:id)

## Team

| [Nomee](https://github.com/imnomee)
