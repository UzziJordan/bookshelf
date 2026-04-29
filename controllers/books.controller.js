


function getAllBooks(req, res) {
    const { read } = req.query; 

    if (read !== undefined) {
        const isRead = read === 'true'; 
        const filteredBooks = books.filter(b => b.isRead === isRead);
        return res.json(filteredBooks);
    }

    res.json(books);
}

function getBooksById(req, res){
    const bookname = req.params.title;
    
    const bookData = books.find(item => item.title.toLowerCase() === bookname.toLowerCase());
    if (bookData) {
        res.json(bookData);
    } else {
        res.status(404).json({ error: "Book not found" });
    }
}

// 🟢 ROUTE LOGIC
function updateBooksById(req, res){
    const bookname = req.params.title;

    const bookData = books.find(
        item => item.title.toLowerCase() === bookname.toLowerCase()
    );

    if (!bookData) {
        return res.status(404).json({ error: "Book not found" });
    }

    const { id, ...updates } = req.body;

    Object.assign(bookData, updates);

    res.json(bookData);
}

function createBooks(req, res) {

    const { title, author, isRead, year } = req.body;

    const book = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        isRead,
        year
    };

    books.push(book);
    res.status(201).json(book);
}

function deleteBooks(req, res) {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(item => item.id === id);
    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1)[0];
        res.json(deletedBook);
    } else {
        res.status(404).json({ error: "Book not found" });
    }
}


module.exports = {
    getAllBooks,
    getBooksById,
    updateBooksById,
    createBooks,
    deleteBooks
}