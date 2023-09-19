import "./BookInfo.css";

const BookInfo = ({ selectedBook }) => {
    if (!selectedBook) {
      return <div>Loading...</div>; 
    }

    const indieBoundLink = selectedBook.buy_links?.find(
      (link) => link.name === "IndieBound"
    )?.url;

    const openIndieBound = () => {
      if (indieBoundLink) {
        window.open(indieBoundLink, "_blank");
      }
    };
  
  return (
    <div className="book-container">
      <div className="image-button-wrapper">
        <img
          src={selectedBook.book_image}
          className="book-image"
          alt={`${selectedBook.title} cover`}
        />
        <button className="buy-button" onClick={openIndieBound}>
          Buy Now
        </button>
      </div>
      <div className="book-details">
        <h1 className="book-title">{selectedBook.title}</h1>
        <h2 className="book-description">{selectedBook.description}</h2>
        <article className="genre-container">
          Genre: <span className="genre-text">{selectedBook.genre}</span>
        </article>
        <div className="book-stats">
          <article className="stat-container">
            Weeks on bestseller list:{" "}
            <span className="stat-number">{selectedBook.weeks_on_list}</span>
          </article>
          <article className="stat-container">
            Current Rank:{" "}
            <span className="stat-number">#{selectedBook.rank}</span>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
