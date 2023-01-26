import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import BookList from '../../components/home/bookList';
import Spinner from '../../components/spinner';
import { stockData } from '../../data';
import { useBooks } from './hook/useBooks';

/**
 * Home component is used to show the list of books.
 *
 * @returns {React.ReactElement} A react component that renders the list of books.
 *
 * @example
 * <Home />
 *
 */
function Home() {
  // State hooks
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setcurrentPage] = useState(0);
  const [OFFSET, setOFFSET] = useState(0);

  // Constant
  const LIMIT = 5;

  const {
    data: { data: books, total },
    isLoading,
    error,
    getBooks,
  } = useBooks();

  // Get books on mount
  useEffect(() => {
    getBooks(LIMIT, OFFSET);
  }, []);

  // Set page count on books change
  useEffect(() => {
    setpageCount(Math.ceil(total / LIMIT));
  }, [books]);

  /**
   * handleChangePage is a function that get a selected index page as a number and use this value to set the offset and current page.
   * The offset is the reference of the first book to render.
   * The current page is the selected page.
   *
   * It accepts three parameters:
   * @param {object} data - is an object with the selected page index that coming from the react paginate after clicking on it.
   * @param {number} [selected] - the page number
   *
   */
  const handleChangePage = (data: { selected: number }): void => {
    setOFFSET(data.selected * LIMIT);
    setcurrentPage(data.selected);
  };

  if (isLoading) return <Spinner />;
  if (error.isError) return <div className="info">{stockData.loadError}</div>;

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

      <BookList books={books} />
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
