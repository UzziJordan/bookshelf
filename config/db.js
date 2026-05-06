const { MongoClient } = require('mongodb');
require('dotenv').config();

let myDb;

async function connectDb() {
  try {
    const uri = process.env.MONGO_URI;

    const client = new MongoClient(uri);

    await client.connect();

    myDb = client.db('devkay');

    console.log("Database Connected Successfully...");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

function getDb() {
  if (!myDb) {
    throw new Error("Database not initialized. Call connectDb first.");
  }
  return myDb;
}

module.exports = { connectDb, getDb };