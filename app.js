const express = require('express');
const app = express();

app.use (express.json());

app.get('/', (req, res) => {
    res.json(books);
}); 

let books = [
    { "id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "isRead": true, "year": 1999 },
    { "id": 2, "title": "The Book of life", "author": "O. Fred Donald", "isRead": !true, "year": 2017 }
]

app.get("/:title", (req, res) => {
    const bookname = req.params.title;
    
    const bookData = books.find(item => item.title.toLowerCase() === bookname.toLowerCase());
    if (bookData) {
        res.json(bookData);
    } else {
        res.status(404).json({ error: "Book not found" });
    }
})

app.put("/:title", (req, res) => {
    const bookname = req.params.title;
    const bookData = books.find(item => item.title.toLowerCase() === bookname.toLowerCase());
    if (bookData) {
        Object.assign(bookData, req.body);
        res.json(bookData);
    } else {
        res.status(404).json({ error: "Book not found" });
    }
});

function validateYear(req, res, next) {
    const year = req.body.year;
    if (year && (typeof year !== 'number' || year < 0 || year > new Date().getFullYear())) {
        return res.status(400).json({ error: "Invalid year" });
    }
    next();
}

app.post("/", validateYear, (req, res) => {
    const newBook = req.body;
    if (!newBook.title || !newBook.author || typeof newBook.isRead !== 'boolean' || !newBook.year) {
        return res.status(400).json({ error: "Invalid book data" });
    }
    
    const book = {
        'id': books.length + 1,
        'title': newBook.title,
        'author': newBook.author,
        'isRead': newBook.isRead,
        'year': newBook.year
    };



    books.push(book);
    res.status(201).json(book);
});

app.delete("/:books", (req, res) => {
    const bookname = req.params.books;
    const bookIndex = books.findIndex(item => item.title.toLowerCase() === bookname.toLowerCase());
    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1)[0];
        res.json(deletedBook);
    } else {
        res.status(404).json({ error: "Book not found" });
    }
});


app.listen(4000, () => {
    console.log('Server is running on port localhost:4000');
});