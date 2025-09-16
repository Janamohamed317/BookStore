const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken")
const { addAuthor, deleteAuthor, updateAuthor, getAllAuthors, getAuthorByName, getAuthorById } = require("..//controllers/authorController")

// get all authors
router.get("/", getAllAuthors)

// get Author by Full Name
router.get("/name/:name", getAuthorByName)

// get author by Id
router.get("/:id", getAuthorById)

// add new author
router.post("/add", verifyTokenAndAdmin, addAuthor)

// update author
router.put("/edit/:id", verifyTokenAndAdmin, updateAuthor)

// delete Author
router.delete("/delete/:id", verifyTokenAndAdmin, deleteAuthor)


module.exports = router;
