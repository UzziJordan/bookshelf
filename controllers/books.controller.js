const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

/* ================= GET ALL BOOKS ================= */
async function getAllBooks(req, res) {
  const { read } = req.query;

  try {
    const db = getDb();
    const collection = db.collection('books');

    let query = {};

    if (read !== undefined) {
      query.isRead = read === 'true';
    }

    const books = await collection.find(query).toArray();

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/* ================= GET BOOK BY TITLE ================= */
async function getBooksById(req, res) {
  const bookname = req.params.title;

  try {
    const db = getDb();
    const collection = db.collection('books');

    const book = await collection.findOne({
      title: { $regex: new RegExp(`^${bookname}$`, "i") }
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/* ================= UPDATE BOOK ================= */
async function updateBooksById(req, res) {
  const bookname = req.params.title;

  try {
    const db = getDb();
    const collection = db.collection('books');

    const { _id, ...updates } = req.body;

    const result = await collection.findOneAndUpdate(
      { title: { $regex: new RegExp(`^${bookname}$`, "i") } },
      { $set: updates },
      { returnDocument: "after" }
    );

    // 🔴 FIX: result.value is what matters
    if (!result.value) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(result.value);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/* ================= CREATE BOOK ================= */
async function createBooks(req, res) {
  const { title, author, isRead, year } = req.body;

  try {
    const db = getDb();
    const collection = db.collection('books');

    const newBook = {
      title,
      author,
      isRead,
      year
    };

    const result = await collection.insertOne(newBook);

    res.status(201).json({
      _id: result.insertedId,
      ...newBook
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/* ================= DELETE BOOK ================= */
async function deleteBooks(req, res) {
  const { id } = req.params;

  try {
    const db = getDb();
    const collection = db.collection('books');

    // 🔴 FIX: Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const result = await collection.findOneAndDelete({
      _id: new ObjectId(id)
    });

    if (!result.value) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(result.value);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllBooks,
  getBooksById,
  updateBooksById,
  createBooks,
  deleteBooks
};