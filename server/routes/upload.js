const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const { Author } = require("../models/Author");
const { Book } = require("../models/Book");

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, "../images"));
        },
        filename: function (req, file, cb) {
            const safeName = file.originalname.replace(/\s+/g, "_");
            cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + safeName);

        },
    });

const upload = multer({ storage });

router.post("/bookImg/:id", upload.single("image"), async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (req.file) {
            book.image = `https://book-store-seven-tan.vercel.app/images/${req.file.filename}`;
            await book.save();
        }

        res.status(200).json({ message: "Image uploaded", book});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
