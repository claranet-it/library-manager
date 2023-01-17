import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { stockData } from '../../data';
import { useBook } from '../../hook/useBook';
import { Book } from '../../types';
import Spinner from '../spinner';
import { BookCard } from './bookCard';

function BookList() {
  /*  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [books, setBooks] = useState([]); */
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setcurrentPage] = useState(0);
  const limit = 5;

  const URL = `http://localhost:8080/api/books?offset=0&limit=${limit}`;
  const { data, isLoading, isError } = useBook(URL);

  console.log('#### data', data);

  /* 
  const fetchBooksFirstCall = async () => {
    const URL = `http://localhost:8080/api/books?offset=0&limit=${limit}`;
    try {
      setIsError(false);
      setIsLoading(true);

      const data = await api.get(URL);
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
      setIsLoading(true);
      const data = await api.get(URL);
      setBooks(data.data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  }; */

  /*   useEffect(() => {
    fetchBooksFirstCall();
  }, [limit]); */

  /*   const handleClicked = async (data: { selected: number }) => {
    let offset = data.selected * limit;
    setcurrentPage(data.selected);
    await fetchBooks(offset);
    // scroll to the top
    window.scrollTo(0, 0);
  }; */

  if (isLoading) return <Spinner />;
  if (isError) return <div className="info">{stockData.loadError}</div>;
  if (data && data.data.length != 0) {
    return (
      <React.Fragment>
        <div className="booklist">
          {books?.map((book: Book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>

        {pageCount > 1 && (
          <ReactPaginate
            previousLabel={'<<'}
            nextLabel={'>>'}
            breakLabel={'...'}
            pageCount={pageCount}
            forcePage={currentPage}
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
  return <div className="info">{stockData.errorNoBooks}</div>;
}

export default BookList;
function getFetch(arg0: string) {
  throw new Error('Function not implemented.');
}
