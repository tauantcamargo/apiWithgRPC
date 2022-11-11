const booksClient = require("../services/books");

class BooksController {
  async store(req, res) {
    const { 
      title,
      author,
      category,
      type,
      price,
      quantity
     } = req.body
    let newBook = { title, author, category, type, price, quantity }
    
    try {
      const response = await new Promise((resolve, reject) => {
        booksClient.insert(newBook, (err, response) => err ? reject(err) : resolve(response))
      })
      return res.json(response)
    } catch (err) {
      return res.error(err)
    }
  }

  async show(req, res) {
    try {
      const response = await new Promise((resolve, reject) => {
        booksClient.GetAll({}, (err, response) => err ? reject(err) : resolve(response))
      })
      return res.json(response)
    } catch (err) {
      return res.json(err)
    }
  }

  async showUniqueById(req, res) {
    const { id } = req.params
    try {
      const response = await new Promise((resolve, reject) => {
        booksClient.getById({ id }, (err, response) => err ? reject(err) : resolve(response))
      })
      return res.json(response)
    } catch (err) {
      return res.json(err)
    }
  }
}

module.exports = new BooksController()
