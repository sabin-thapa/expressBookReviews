const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  //Write your code here
  const results = await JSON.stringify(books)
  return res.status(300).json(results);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const filteredBook = books[isbn]
  console.log(filteredBook, "FIltered Boo");
  return res.status(300).json({book: filteredBook});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const authorName = req.params.author;
  const bookIds = Object.keys(books);
  const booksByAuthor = [];
  
  bookIds.forEach((id) => {
    const book = books[id];
    if (book.author === authorName) {
      booksByAuthor.push({id, ...book});
    }
  });
  
  if (booksByAuthor.length === 0) {
    return res.status(404).json({message: "No books found for the provided author"});
  }
  
  return res.status(200).json({books: booksByAuthor});
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
