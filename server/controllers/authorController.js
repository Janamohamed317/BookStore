const { Author, ValidateAddAuthor, ValidateUpdateAuthor } = require("../models/Author")
const asyncHandler = require("express-async-handler")
const mongoose = require("mongoose");

const getAllAuthors = asyncHandler(
    async (req, res) => {
        const authorList = await Author.find({ isDeleted: false })
        res.status(200).json(authorList)
    }
)


const getAuthorByNameOrID = asyncHandler(async (req, res) => {
    const { query } = req.params;
    let author;

    if (mongoose.Types.ObjectId.isValid(query)) {
        author = await Author.findById(query);
    }

    if (!author) {
        author = await Author.findOne({ fullName: query });
    }

    if (author) {
        res.status(200).json(author);
    } else {
        res.status(404).json({ message: "Author Not Found" });
    }
})


const addAuthor = asyncHandler(async (req, res) => {
    const { error } = ValidateAddAuthor(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    let author = await Author.findOne({ fullName: req.body.fullName });

    if (author) {
        if (author.isDeleted) {
            author.isDeleted = false;
            author.nationality = req.body.nationality; 
            const result = await author.save();
            return res.status(200).json(result);
        }

        return res.status(409).json({ message: "Author Already Exists" });
    }

    author = new Author({
        fullName: req.body.fullName,
        nationality: req.body.nationality,
    });

    const result = await author.save();
    res.status(201).json(result);
});



const updateAuthor = asyncHandler(
    async (req, res) => {
        const { error } = ValidateUpdateAuthor(req.body);
        if (error) {
            return res.status(400).json(error.details[0].message)
        }

        let author = await Author.findOne({ fullName: req.body.fullName })

        if (author) {
            return res.status(409).json({ message: "Author With the Same Name Already Exists" })
        }

        author = await Author.findByIdAndUpdate(req.params.id, {
            $set:
            {
                fullName: req.body.fullName,
                nationality: req.body.nationality,
            }
        }, { new: true })
        if (author) {
            res.status(200).json(author)
        }
        else {
            res.status(404).json({ message: "Author not Found" })
        }
    }
)




const deleteAuthor = asyncHandler(
    async (req, res) => {
        const author = await Author.findById(req.params.id)
        if (author) {
            author.isDeleted = true
            await author.save();
            res.status(200).json({ message: "Author has been deleted" })
        }
        else {
            res.status(404).json({ message: "author not Found" })
        }

    }
)


module.exports = {
    getAllAuthors,
    deleteAuthor,
    updateAuthor,
    addAuthor,
    getAuthorByNameOrID
}