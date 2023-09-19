import React, { useState, useEffect } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { fetchApi } from "../ApiCalls";
import cleanData from "../Cleaning";
import Books from "./Books";
import BookInfo from "./BookInfo";
import Header from "./Header";
import Form from "./Form";
import NotFound from "./Error";
import "./App.css";

interface Book {
  age_group: string;
  amazon_product_url: string;
  article_chapter_link: string;
  author: string;
  book_image: string;
  book_image_height: number;
  book_image_width: number;
  book_review_link: string;
  book_uri: string;
  buy_links: Array<{ [key: string]: any }>
  contributor: string;
  contributor_note: string;
  created_date: string;
  description: string;
  first_chapter_link: string;
  price: string;
  primary_isbn10: string;
  primary_isbn13: string;
  publisher: string;
  rank: number;
  rank_last_week: number;
  sunday_review_link: string;
  title: string;
  updated_date: string;
  weeks_on_list: number;
}

interface MatchParamsSearch {
  searchQuery: string;
}

interface MatchParamsId {
  id: string;
}

const App = () => {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const getBooks = async () => {
    try {
      setLoading(true);
      const data = await fetchApi(
        "https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=E9xtZB07yTZcCOoDRFhWpJmAEhjNMQ2r"
      );
        console.log("Fetched data:", data);
      const books: Book[] = await cleanData(data);
      setAllBooks(books);
    } catch (error) {
      setError("Server Error");
    }
    setLoading(false);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const showSearchResults = (props: RouteComponentProps<MatchParamsSearch>) => {
    const filteredBooks = allBooks.filter(
      (book) =>
        book.title.includes(props.match.params.searchQuery) ||
        book.title.includes(props.match.params.searchQuery.toUpperCase())
    );
    return (
      <div>
        <Form />
        <Books booksToDisplay={filteredBooks} />
      </div>
    );
  };

   const showBookInfo = (props: RouteComponentProps<MatchParamsId>) => {
     const selected = allBooks.find(
       (book) => book.primary_isbn10 === props.match.params.id
     );
     if (selected) {
       setSelectedBook(selected);
     }
     return <BookInfo selectedBook={selectedBook} />;
   };

  const loadingPage = loading && <h3 className="loading">LOADING</h3>;

  const errorPage = error !== "" && (
    <h3 className="error">Error: {error}, please try again.</h3>
  );

  const mainPage = () => {
    if (!loading && error === "") {
      return (
        <div>
          <Form />
          <Books booksToDisplay={allBooks} />
        </div>
      );
    }
  };

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          {loadingPage}
          {errorPage}
          {mainPage()}
        </Route>
        <Route
          path="/search/:searchQuery"
          render={(props: RouteComponentProps<MatchParamsSearch>) =>
            showSearchResults(props)
          }
        ></Route>
        <Route
          path="/book/:id"
          render={(props: RouteComponentProps<MatchParamsId>) =>
            showBookInfo(props)
          }
        ></Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default App;