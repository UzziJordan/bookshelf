const { MongoClient } = require('mongodb');


// let books = [
//   { "title": "Harry Potter", "author": "J.K Rowling", "isRead": true, "publishedYear": 1997 },
//   { "title": "Game of Thrones", "author": "George R.R Martin", "isRead": false, "publishedYear": 1996 },
//   { "title": "Rich Dad Poor Dad", "author": "Robert Kiyosaki", "isRead": true, "publishedYear": 1997 }
// ]
let myDb;

async function connectDb() {
  // Replace the uri string with your connection string
  const uri = 'mongodb+srv://fikkii:thisisthepassword@cluster0.pt46zmv.mongodb.net/?appName=Cluster0';
  myDb = new MongoClient(uri);

  await myDb.connect();

  try {
    //CREATE OPERATIONS
    // const database = myDb.db('devkay');
    // const movies = database.collection('books');

    // // // Queries for a movie that has a title value of 'Back to the Future'
    // // const query = [{ title: 'In the Beginning' }];

    // const movie = await movies.insertMany(books);

    // //READ OPERATIONS
    // const database = myDb.db('devkay');
    // const collection = database.collection('books');

    // const cursor = await collection.find({isRead: false});
    // const movies = await cursor.toArray();

    console.log("Database Connected Successfully...");
  } finally {
    await myDb.close();
  }
}

function getDb(){
    return myDb
}

module.exports = { connectDb, getDb }