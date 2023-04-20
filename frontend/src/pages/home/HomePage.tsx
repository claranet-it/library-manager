import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { BOOK } from '../../api/bookClient';
import { Book, PaginatedData, TError } from '../../model';
import { stockData } from '../../model/label';
import { ErrorMessage } from '../../shared/components/error/Error';
import { Spinner } from '../../shared/components/spinner/Spinner';
import { BookList } from './components/BookList';

export const HomePage: React.FC = () => {
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setcurrentPage] = useState(Number(localStorage.getItem('currentPage')) || 0);

  const LIMIT = import.meta.env.VITE_LIMIT;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError>({ isError: false, message: '' });
  const [bookListState, setBookListState] = useState<PaginatedData<Book> | null>(null);

  const getBooks = async (currentPage: number) => {
    try {
      setError((prev) => ({ ...prev, isError: false }));
      setIsLoading(true);

      const data = await BOOK.getAll(currentPage);
      setBookListState(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : stockData.error;
      setError({ isError: true, message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBooks(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (!bookListState) return;
    setpageCount(Math.ceil(bookListState?.total / LIMIT));
  }, [bookListState]);

  const handleChangePage = (data: { selected: number }): void => {
    localStorage.setItem('currentPage', data.selected.toString());
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
          previousLabel={null}
          nextLabel={null}
          breakLabel={null}
          pageCount={pageCount}
          forcePage={currentPage}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handleChangePage}
          containerClassName={'pagination'}
          pageClassName={'pagination__item'}
          pageLinkClassName={'pagination__link'}
          activeClassName={'pagination__item--active'}
          activeLinkClassName={'pagination__link--active'}
        />
      )}
      {/* End Pagination */}
    </div>
  );
};
