const express = require('express');
const morgan = require('morgan');
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

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