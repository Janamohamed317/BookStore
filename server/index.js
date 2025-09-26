const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const authPath = require("./routes/auth");
const passwordPath = require("./routes/password");
const uploadPath = require("./routes/upload");
const usersPath = require("./routes/users");
const ordersPath = require("./routes/orders")
const dbConnection = require("./db/dbConnection");
const { notFound, errorHandler } = require("./middlewares/errors")


const app = express();
const helmet = require("helmet")
const cors = require("cors")
const path = require("path");


// yhwl json l js obj
app.use(express.json());
app.use(express.urlencoded({ extended: false }))



// Helmet
app.use(helmet())

// cors
app.use(cors())


// Allow frontend (5173) to use images from backend (5000)
app.use("/images", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin"); // 👈 important
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");  // optional
  next();
});

app.use(
  "/images",
  express.static(path.join(__dirname, "images"))
);



// routes
app.use('/api/books', booksPath);
app.use('/api/authors', authorsPath);
app.use('/api/auth', authPath);
app.use('/api/users', usersPath);
app.use('/api/password', passwordPath);
app.use('/api/upload', uploadPath);
app.use('/api/order', ordersPath);



// Error Handler Middleware
app.use(notFound)
app.use(errorHandler)


const PORT = 5000 ||process.env.PORT

// app.listen(PORT, () => {
//   dbConnection();
//   console.log(`Server is running on port ${PORT}`);
// });

dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });