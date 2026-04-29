const express = require('express');
const morgan = require('morgan');
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const mongoose = require('mongoose');

const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb+srv://fikkii:iamaboyin2016@cluster0.pt46zmv.mongodb.net/?appName=Cluster0');

client.db('bookshelf').collection('books').find({}).toArray().then((books) => {
    console.log('Books:', books);
}).catch((err) => {
    console.error('Error fetching books:', err);
});

let books = [
    { "id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "isRead": true, "year": 1999 },
    { "id": 2, "title": "The Book of life", "author": "O. Fred Donald", "isRead": false, "year": 2017 }
]

client.db('bookshelf').collection('books').insertMany(books).then((books) => {
    console.log('Books:', books);
}).catch((err) => {
    console.error('Error fetching books:', err);
});

const userRouter = require('./routes/user.routes');
const bookRouter = require('./routes/books.routes');
const foodRouter = require('./routes/food.routes');

const app = express();
app.use(rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100 // limit each IP to 100 requests per windowMs
}));

app.use(morgan('dev'));
app.use (express.json());
app.use(helmet());
app.use(express.static("public"));

app.use('/users', userRouter);
app.use('/books', bookRouter);

app.listen(4000, () => {
    console.log('Server is running on port localhost:4000');
});