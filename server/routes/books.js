const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken")
const { getAllBooks,getBookByID, addBook, editBook, deleteBook } = require("..//controllers/bookController")


// Get all books
router.get("/", getAllBooks)

// get book by id
router.get("/:id",getBookByID)

// add new book
router.post("/add", verifyTokenAndAdmin,addBook)

// update book
router.put("/edit/:id", verifyTokenAndAdmin, editBook)

//delete book
router.delete("/delete/:id", verifyTokenAndAdmin, deleteBook)




module.exports = router;