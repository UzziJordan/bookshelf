const express = require('express');
const morgan = require('morgan');
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

require('dotenv').config();

const userRouter = require('./routes/user.routes');
const bookRouter = require('./routes/books.routes');
// const foodRouter = require('./routes/food.routes'); // remove if not used

const { connectDb } = require('./config/db');

const app = express();

/* ================= MIDDLEWARE ================= */

// Security
app.use(helmet());

// Rate Limiting
app.use(rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100
}));

// CORS
app.use(cors());

// Logger
app.use(morgan('dev'));

// Body Parser
app.use(express.json());

// Static files
app.use(express.static("public"));

/* ================= ROUTES ================= */

app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

/* ================= START SERVER ================= */

async function startServer() {
  try {
    await connectDb(); // ✅ connect FIRST

    app.listen(4000, () => {
      console.log('Server is running on http://localhost:4000');
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();