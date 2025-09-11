const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken")
const { addAuthor, deleteAuthor, updateAuthor, getAllAuthors, getAuthorByNameOrID } = require("..//controllers/authorController")

// get all authors
router.get("/",getAllAuthors)

router.get("/:query" , getAuthorByNameOrID)

// add new author
router.post("/add", verifyTokenAndAdmin,addAuthor)

// update author
router.put("/edit/:id", verifyTokenAndAdmin,updateAuthor)

// delete Author
router.delete("/delete/:id", verifyTokenAndAdmin, deleteAuthor)


module.exports = router;
