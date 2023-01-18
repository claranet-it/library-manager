import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import BookList from '../../components/home/bookList';
import { stockData } from '../../data';
import { ENDPOINTS } from '../../utils/endpoint';
import { useBook } from './hook/useBook';

function Home() {
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setcurrentPage] = useState(0);

  const [inputValue, setInputValue] = useState('');
  const OFFSET = 0;
  const LIMIT = 5;

  const {
    data: { data: books },
    isLoading,
    isError,
    refetch,
  } = useBook(ENDPOINTS.BOOKS, OFFSET, LIMIT);

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
      <h2>L'input è: {inputValue}</h2>
      <BookList books={books} isLoading={isLoading} isError={isError} />
      {/* Pagination */}
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
      {/* End Pagination */}
    </div>
  );
}

export default Home;
