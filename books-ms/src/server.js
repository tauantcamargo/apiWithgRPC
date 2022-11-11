const path = require("path")
const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")

const booksServices = require("./services/books")
const protoDefinitions = require("./configs/protoDefinitions")

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, 'proto', 'books.proto'),
  protoDefinitions
)

const { books: booksProto } = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()

server.addService(booksProto.BookService.service, booksServices)

server.bind("localhost:3334", grpc.ServerCredentials.createInsecure())
console.log("Server is running on port http://localhost:3334")
server.start()

