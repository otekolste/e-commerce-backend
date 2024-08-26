# E-Commerce Backend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



## Description

This is a command-line application intended to act as a backend for an e-commerce platform, built using Sequelize  and PostgreSQL. It allows users to manage the core components of an e-commerce database, including products, categories, and tags. The application establishes and connects to a PostgreSQL database using Sequelize modeling, and creates a set of API endpoints to perform CRUD (Create, Read, Update, Delete) operations on the database. This application provides a solid foundation for more complex e-commerce systems, or for easy integration with a frontend!

### Features:

* Product Management: Create, update, delete, and retrieve information about products or one specific product.
* Category Management: Organize products by creating, updating, deleting, and retrieving categories.
* Tag Management: Create, edit, and delete tags to describe products, or simply see a list of all tags (or one tag in particular).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

To use this program, you must have npm and PostgreSQl installed. Once you've downloaded and extracted the files to your directory of choice, navigate to the directory via command line and run `npm i` to install all of the required packages. Create a copy of the .env.EXAMPLE file (or rename it to .env) and input your PostgreSQL credentials in the corresponding fields. Then you can get started!

## Usage

To create the database, use the `psql -U username` command to log in via your command line (substituting username with your username). Make sure you're in the `/db` folder, then run `\i schema.sql.` The database will be created!

Next, if you wish to seed the database with starter information, navigate back to the root folder and run `node seeds/index.js`. 

Then, to start the server, simply run `node server` and the server will start up! While it's running, you can use Insomnia, Postman, or any service that allows you to make API calls as you desire. To get started, try doing a GET request to `localhost:3001/api/categories`. The endpoints are as follows: 

`/api/categories`: Get all categories, or create a new one with a POST request
`/api/categories/:id`: Get a category with the corresponding ID; alternatively, update or delete a specific category
`/api/tags`: Get all tags, or create a new one with a POST request
`/api/tags/:id`: Get a tag with the corresponding ID; alternatively, update or delete a specific tag
`/api/products`: Get all products, or create a new one with a POST request
`/api/products/:id`: Get a product with the corresponding ID; alternatively, update or delete a specific product

For templates for PUT and POST requests, look at the files in the `/seeds` folder.

You can also look at the walkthrough video below.

## Credits

Starter code provided via edX.

[Sequelize package](https://www.npmjs.com/package/sequelize) used to create models and connect to the database.
[PostgreSQL](https://www.postgresql.org/) used to establish database
[Express](https://www.npmjs.com/package/express) used for creating web server
[Dotenv](https://www.npmjs.com/package/dotenv) used for hiding secrets

## License

This project is covered by the MIT license; for more information, click the badge at the top of this file.