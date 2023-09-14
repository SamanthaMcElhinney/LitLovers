import React, { useState, useEffect } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import { fetchApi } from "../ApiCalls";
import cleanData from "../Cleaning";
import Books from "../Components/Books";
import BookInfo from "../Components/BookInfo";
import Header from "../Components/Header";
import Form from "../Components/Form";
import NotFound from "../Components/Error";
import "./App.css";

const App = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});

  const getBooks = async () => {
    try {
      setLoading(true);
      const data = await fetchApi(
        "https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=E9xtZB07yTZcCOoDRFhWpJmAEhjNMQ2r"
      );
      const books = await cleanData(data);
      setAllBooks(books);
    } catch (error) {
      setError(error.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const LoadingPage = () => loading && <h3 className="loading">LOADING</h3>;
  const ErrorPage = () =>
    error && <h3 className="error">Error: {error}, please try again.</h3>;
  const MainPage = () =>
    !loading &&
    !error && (
      <>
        <Form />
        <Books booksToDisplay={allBooks} />
      </>
    );

  const SearchResults = () => {
    const { searchQuery } = useParams();
    const filteredBooks = allBooks.filter((book) =>
      book.title.includes(searchQuery)
    );
    return <Books booksToDisplay={filteredBooks} />;
  };

  const BookDetails = () => {
    const { id } = useParams();
    const selected = allBooks.find((book) => book.primary_isbn10 === id);
    setSelectedBook(selected);
    return <BookInfo selectedBook={selectedBook} />;
  };

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <LoadingPage />
          <ErrorPage />
          <MainPage />
        </Route>
        <Route path="/search/:searchQuery" component={SearchResults}></Route>
        <Route path="/book/:id" component={BookDetails}></Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
