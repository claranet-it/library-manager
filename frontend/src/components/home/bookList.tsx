import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Book } from '../../types';
import { api } from '../../utils/API';
import Spinner from '../spinner';
import { BookCard } from './bookCard';

function BookList() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [books, setBooks] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const limit = 5;

  const fetchBooksFirstCall = async () => {
    const URL = `http://localhost:8080/api/books?offset=0&limit=${limit}`;
    try {
      setIsError(false);
      setIsLoading(true);

      const res = await api.getFetch(URL);
      const data = await res.json();
      const total: number = data.total;

      setpageCount(Math.ceil(total / limit));
      setBooks(data.data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const fetchBooks = async (offset: number) => {
    const URL = `http://localhost:8080/api/books?offset=${offset}&limit=${limit}`;
    try {
      setIsError(false);
      const res = await api.getFetch(URL);
      const data = await res.json();
      setBooks(data.data);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchBooksFirstCall();
  }, [limit]);

  const handleClicked = async (data: { selected: number }) => {
    let offset = data.selected * limit;
    await fetchBooks(offset);
    // scroll to the top
    window.scrollTo(0, 0);
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div className="info">Errore caricamento dati</div>;
  if (books.length != 0) {
    return (
      <React.Fragment>
        <div className="booklist">
          {books.map((book: Book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>

        {pageCount > 1 && (
          <ReactPaginate
            previousLabel={'<<'}
            nextLabel={'>>'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handleClicked}
            containerClassName={'pagination'}
            pageClassName={'pagination__item'}
            pageLinkClassName={'pagination__link'}
            previousClassName={'pagination__controlls'}
            previousLinkClassName={'pagination__controlls'}
            nextClassName={'pagination__controlls'}
            nextLinkClassName={'pagination__controlls'}
            breakClassName={'pagination__item'}
            breakLinkClassName={'pagination__link'}
            activeClassName={'pagination__item--active'}
            activeLinkClassName={'pagination__link--active'}
          />
        )}
      </React.Fragment>
    );
  }
  return <div className="info">Non ci sono libri nel catalogo</div>;
}

export default BookList;
function getFetch(arg0: string) {
  throw new Error('Function not implemented.');
}
