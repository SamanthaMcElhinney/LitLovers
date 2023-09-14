const cleanData = (data) => {
  const allBooks = data.results.lists.flatMap((list) =>
    list.books.map((book) => ({ ...book, genre: list.list_name }))
  );
  const bookMap = allBooks.reduce((acc, book) => {
    const updatedBook = {
      ...book,
      primary_isbn10: book.primary_isbn10 || book.primary_isbn13,
    };

    return acc.set(updatedBook.title, updatedBook);
  }, new Map());

  return Array.from(bookMap.values());
};

export default cleanData;
