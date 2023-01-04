import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Book } from "../../interface";
import Spinner from "../Spinner";
import BookCard from "./bookCard";

function BookList(props: any) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [books, setBooks] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    let limit = 5;

    useEffect(() => {
        const getBooks = async () => {
            try {
                setIsError(false);
                setIsLoading(true);

                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'contentType': 'application/json'
                    },
                };
                const res = await fetch(
                    `http://localhost:8080/api/books?offset=0&limit=${limit}`, requestOptions
                );
                const data = await res.json();
                const total: number = data.total;
                setpageCount(Math.ceil(total / limit));
                setBooks(data.data);

            } catch (error) {
                setIsError(true);
            };
            setIsLoading(false);
        };
        getBooks();
    }, [limit]);

    const fetchBooks = async (offset: number) => {
        try {
            setIsError(false);
            const requestOptions = {
                method: 'GET',
                headers: {
                    'contentType': 'application/json'
                },
            };
            const res = await fetch(
                `http://localhost:8080/api/books?offset=${offset}&limit=${limit}`, requestOptions
            );
            const data = await res.json();
            setBooks(data.data);

        } catch (error) {
            setIsError(true);
        };
    };

    const handleClicked = async (data: any) => {
        let offset = data.selected * limit;
        await fetchBooks(offset);
        // scroll to the top
        window.scrollTo(0, 0)
    };



    if (isLoading) return <Spinner />;
    else if (isError) return <div className="info">Errore caricamento dati</div>;
    else if (books.length != 0) {
        return (
            <React.Fragment>
                <div className="booklist">
                    {books.map((book: Book) => (
                        <BookCard book={book} key={book.id} />
                    ))}
                </div>

                <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handleClicked}
                    containerClassName={"pagination"}
                    pageClassName={"pagination__item"}
                    pageLinkClassName={"pagination__link"}
                    previousClassName={"pagination__controlls"}
                    previousLinkClassName={"pagination__controlls"}
                    nextClassName={"pagination__controlls"}
                    nextLinkClassName={"pagination__controlls"}
                    breakClassName={"pagination__item"}
                    breakLinkClassName={"pagination__link"}
                    activeClassName={"pagination__item--active"}
                    activeLinkClassName={"pagination__link--active"} />
            </React.Fragment>
        );
    }
    else {
        return <div className="info">Non ci sono libri nel catalogo</div >
    }
};

export default BookList;