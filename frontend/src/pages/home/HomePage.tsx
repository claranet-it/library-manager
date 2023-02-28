import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { BOOK } from '../../api/bookClient';
import { stockData } from '../../model/label';
import { Book, PaginatedData, TError } from '../../model/types';
import { ErrorMessage } from '../../shared/components/error/Error';
import { Spinner } from '../../shared/components/spinner/Spinner';
import { BookList } from './components/BookList';

export const HomePage: React.FC = () => {
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setcurrentPage] = useState(0);

  const LIMIT = import.meta.env.VITE_LIMIT;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError>({ isError: false, message: '' });
  const [bookListState, setBookListState] = useState<PaginatedData<Book> | null>(null);

  const getBooks = (currentPage: number) => {
    setError((prev) => ({ ...prev, isError: false }));
    setIsLoading(true);

    BOOK.getAll(currentPage)
      .then((data) => {
        setBookListState(data);
      })
      .catch((error: Error) => {
        setError((prev) => ({ ...prev, isError: true, message: error.message }));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getBooks(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (!bookListState) return;
    setpageCount(Math.ceil(bookListState?.total / LIMIT));
  }, [bookListState]);

  const handleChangePage = (data: { selected: number }): void => {
    setcurrentPage(data.selected);
  };

  if (isLoading) return <Spinner />;
  if (error.isError) return <ErrorMessage message={stockData.loadError} />;

  return (
    <div className="page home">
      <div className="topbar home__topbar">
        <h1 className="page__title">{stockData.list}</h1>
        <div>
          <Link to="/create">
            <button className="home__button-add">+ {stockData.add}</button>
          </Link>
        </div>
      </div>
      {bookListState && <BookList books={bookListState?.data} />}
      {/* Pagination */}
      {pageCount > 1 && !isLoading && (
        <ReactPaginate
          previousLabel={'<<'}
          nextLabel={'>>'}
          breakLabel={'...'}
          pageCount={pageCount}
          forcePage={currentPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handleChangePage}
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
      {/* End Pagination */}
    </div>
  );
};
