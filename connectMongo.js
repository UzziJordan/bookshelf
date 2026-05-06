const { MongoClient } = require('mongodb');


// let books = [
//   { "title": "Harry Potter", "author": "J.K Rowling", "isRead": true, "publishedYear": 1997 },
//   { "title": "Game of Thrones", "author": "George R.R Martin", "isRead": false, "publishedYear": 1996 },
//   { "title": "Rich Dad Poor Dad", "author": "Robert Kiyosaki", "isRead": true, "publishedYear": 1997 }
// ]

async function runGetStarted() {
  // Replace the uri string with your connection string
  const uri = 'mongodb://fikkii:thisisthepassword@cluster0.pt46zmv.mongodb.net/?appName=Cluster0';
  const client = new MongoClient(uri);

  try {
    //CREATE OPERATIONS
    // const database = client.db('devkay');
    // const movies = database.collection('books');

    // // // Queries for a movie that has a title value of 'Back to the Future'
    // // const query = [{ title: 'In the Beginning' }];

    // const movie = await movies.insertMany(books);

    //READ OPERATIONS
    const database = client.db('devkay');
    const collection = database.collection('books');

    const cursor = await collection.find({isRead: false});
    const movies = await cursor.toArray();
    console.log(movies);
  } finally {
    await client.close();
  }
}

runGetStarted().catch(console.dir);