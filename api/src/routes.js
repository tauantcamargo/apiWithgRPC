const { Router } = require("express")
const BooksController = require("./controllers/Books")
const router = Router()

// Users

// Books
router.post('/books', BooksController.store)
router.get('/books', BooksController.show)
router.get('/books/:id', BooksController.showUniqueById)

// Purchases

module.exports = router

