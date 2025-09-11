const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const authPath = require("./routes/auth");
const passwordPath = require("./routes/password");
const usersPath = require("./routes/users");
const dbConnection = require("./db/dbConnection");
const { notFound, errorHandler } = require("./middlewares/errors")
const app = express();
const helmet = require("helmet")
const cors = require("cors")

// yhwl json l js obj
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Helmet
app.use(helmet())

// cors
app.use(cors())

// routes
app.use('/api/books', booksPath);
app.use('/api/authors', authorsPath);
app.use('/api/auth', authPath);
app.use('/api/users', usersPath);
app.use('/api/password', passwordPath);

// Error Handler Middleware
app.use(notFound)
app.use(errorHandler)


const PORT = 5000

app.listen(PORT, () => {
  dbConnection();
  console.log(`Server is running on port ${PORT}`);
});
