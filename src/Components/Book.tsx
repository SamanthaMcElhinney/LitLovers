import React from "react";
import { Link } from "react-router-dom";
import "./Book.css";

interface BookProps {
  img:string,
  title: string,
  author: string,
  id:string,
}

const Book: React.FC<BookProps> = ({ img, title, author, id }) => {
  return (
    <Link to={`/book/${id}`} className="book-card">
      <img src={img} className="card-img"></img>
      <div className="card-text">
        <h2>{title}</h2>
        <h3>By {author}</h3>
      </div>
    </Link>
  );
};

export default Book;
