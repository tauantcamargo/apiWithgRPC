const grpc = require("grpc")
const { v4: uuidv4 } = require("uuid");

// local db
let books = []

module.exports = {
  GetAll: (_, callback) => {
    callback(null, { books })
  },
  GetById: (call, callback) => {
    const { id: receivedId } = call.request
    let selectedBook = books.find(({ id }) => id === receivedId)

    if (selectedBook) callback(null, selectedBook)
    else callback({
      code: grpc.status.NOT_FOUND,
      details: "Book was not found"
    })
  },
  GetByName: ({request: { name: receivedName }}, callback) => {
    let selectedBook = books.find(({ name }) => name === receivedName)

    if (selectedBook) callback(null, selectedBook)
    else callback({
      code: grpc.status.NOT_FOUND,
      details: "Book was not found"
    })
  },
  Insert: ({ request }, callback) => {
    let newBook = request

    newBook.id = uuidv4()
    console.log(newBook)
    books.push(newBook)
    callback(null, newBook)
  },
  Update: ({ 
    request: {
      id: receivedId,
      title,
      author,
      category,
      type,
      price,
      quantity
     }
    }, callback) => {
    let existingBook = books.find(({ id }) => id === receivedId)

    if (existingBook) {
      existingBook.title = title
      existingBook.author = author
      existingBook.category = category
      existingBook.type = type
      existingBook.price = price
      existingBook.quantity = quantity

      console.log(books)

      callback(null, existingBook)
    } else callback({
      code: grpc.status.NOT_FOUND,
      details: "Book was not found"
    })
  },
  Remove: ({ request: { id: receivedId } }, callback) => {
    let existingBookIndex = books.findIndex(({ id }) => id == receivedId);

    if (existingBookIndex != -1) {
        books.splice(existingBookIndex, 1);
        callback(null, {});
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Books was not found"
        });
    }
  }
}
