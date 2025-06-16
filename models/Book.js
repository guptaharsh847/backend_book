const mongoose = require('mongoose');

// Define schema for a Book
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  coverImage: { type: String }, // URL of the cover image
  isRead: { type: Boolean, default: false } // For categorizing read/unread
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
// This code defines a Mongoose model for a Book, which includes fields for title, author, genre, publication year, cover image URL, and a boolean to indicate if the book has been read. The model can be used to interact with a MongoDB database in a Node.js application.