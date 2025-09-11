const asyncHandler = require("express-async-handler")
const { Book, ValidateBookCreation, ValidateUpdateBook } = require("../models/Book")


const getAllBooks = asyncHandler(
    async (req, res) => {
        const { maxPrice, minPrice } = req.query
        let BookList
        if (maxPrice && minPrice) {
            BookList = await Book.find({ price: { $lt: maxPrice, $gt: minPrice } }).
                populate("author", ['_id', "fullName"])

        }
        else {
            BookList = await Book.find().
                populate("author", ['_id', "fullName"])

        }
        res.status(200).json(BookList)
    }
)

const getBookByID = asyncHandler(
    async (req, res) => {
        const book = await Book.findById(req.params.id)
        if (book) {
            res.status(200).json(book);
        }
        else {
            res.status(404).json({ message: "Book not Found" })
        }
    }
)

const addBook = asyncHandler(
    async (req, res) => {
        const { error } = ValidateBookCreation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }
        let book = await Book.findOne({ title: req.body.title })

        if (book) {
            return res.status(409).json({ message: "Book With the Same Name Already Exists" })
        }

        book = new Book({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            cover: req.body.cover,
            price: req.body.price,
        })

        const result = await book.save()
        res.status(201).json(result);

    }
)

const editBook = asyncHandler(
    async (req, res) => {
        const { error } = ValidateUpdateBook(req.body);

        if (error) {
            return res.status(400).json(error.details[0].message)
        }

        const { id } = req.params;

        let book = await Book.findOne({ title: req.body.title, _id: { $ne: id } })

        if (book) {
            return res.status(409).json({ message: "Book With the Same Name Already Exists" })
        }

        book = await Book.findByIdAndUpdate(req.params.id, {
            $set:
            {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                cover: req.body.cover,
                price: req.body.price,
            }
        }, { new: true })

        res.status(200).json(book)

    }
)

const deleteBook = asyncHandler(
    async (req, res) => {
        const book = await Book.findById(req.params.id)
        if (book) {
            await Book.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: "Book has been Deleted" })
        }
        else {
            res.status(404).json({ message: "Book not Found" })

        }
    }
)


module.exports = {
    getAllBooks,
    getBookByID,
    addBook,
    editBook,
    deleteBook,

}