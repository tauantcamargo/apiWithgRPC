const path = require("path")
const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")
const protoDefinitions = require("../configs/protoDefinitions")

const packageDefinition = protoLoader.loadSync(path.resolve(__dirname, "..", "proto", "books.proto"), protoDefinitions);
const BookService = grpc.loadPackageDefinition(packageDefinition).books.BookService

const booksClient = new BookService(
    "localhost:3334",
    grpc.credentials.createInsecure()
);

module.exports = booksClient
