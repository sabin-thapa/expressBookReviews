const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const {username, password} = req.body;
  if (!username || !password) {
  return res.status(400).json({message: "Username and password are required."});
  }
  // check if username already exists
  if (users[username]) {
  return res.status(409).json({message: "Username already exists."});
  }
  // add new user
  users[username] = {password};
  return res.status(201).json({message: "User registered successfully."});
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
  const filteredBook = await books[isbn]
  console.log(filteredBook, "FIltered Boo");
  return res.status(300).json({book: filteredBook});
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const authorName = req.params.author;
  const bookIds = Object.keys(books);
  const booksByAuthor = [];
  
  bookIds.forEach(async (id) => {
    const book = await books[id];
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
  const title = req.params.title;
  const bookIds = Object.keys(books);
  const booksByTitle = [];

  bookIds.forEach(id => {
    const book = books[id]
    if(book.title === title) {
      booksByTitle.push({id, ...book})
    }
  })
  if (booksByTitle.length === 0) {
    return res.status(404).json({message: "No books found for the provided title"});
  }

  return res.status(200).json({books: booksByTitle});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const filteredBook = books[isbn]
  const filteredReview = filteredBook.review;
  return res.status(300).json({review: filteredReview});
});

module.exports.general = public_users;
