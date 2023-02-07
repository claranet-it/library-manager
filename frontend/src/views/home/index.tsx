import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import BookList from '../../components/home/bookList';
import Spinner from '../../components/spinner';
import { stockData } from '../../data';
import { Book, PaginatedData } from '../../types';
import { API } from '../../utils/ApiClient';
import Error from '../error';

type TError = {
  isError: boolean;
  message: string;
};

type TUseBooks = {
  data: PaginatedData<Book>;
  error: TError;
  isLoading: boolean;
  getBooks: (offset: number, limit: number) => Promise<void>;
};

const LIMIT = 5;

function Home() {
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setcurrentPage] = useState(0);
  const [OFFSET, setOFFSET] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError>({ isError: false, message: '' });
  const [books, setBooks] = useState<PaginatedData<Book> | null>(null);

  const getBooks = async (offset?: number, limit?: number) => {
    try {
      setError((prev) => ({ ...prev, isError: false }));
      setIsLoading(true);

      // Get the books
      const data = await API.getBooks(offset, limit);
      setBooks(data);
    } catch (error) {
      setError((prev) => ({ ...prev, isError: true, message: 'errore' }));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getBooks(OFFSET, LIMIT);
  }, [OFFSET]);

  useEffect(() => {
    if (!books) return;
    setpageCount(Math.ceil(books?.total / LIMIT));
  }, [books]);

  const handleChangePage = (books: { selected: number }): void => {
    setOFFSET(books.selected * LIMIT);
    setcurrentPage(books.selected);
  };

  if (isLoading) return <Spinner />;
  if (error.isError) return <Error />;

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

      {books && <BookList books={books?.data} />}
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
}

export default Home;
