import React from "react";
import Book from "../Components/Book";
import { Link } from "react-router-dom";
import "./Books.css";

const Books = ({ booksToDisplay }) => {
  const bookCards = booksToDisplay.map((book) => {
    return (
      <Book
        img={book.book_image}
        title={book.title}
        author={book.author}
        key={book.primary_isbn10}
        id={book.primary_isbn10}
      />
    );
  });

  const books = <div className="books-container">{bookCards}</div>;

  const noResults = (
    <div className="no-results">
      <h3>No results! Please try searching for something else.</h3>
    </div>
  );

  return bookCards.length !== 0 ? books : noResults;
};

export default Books;

