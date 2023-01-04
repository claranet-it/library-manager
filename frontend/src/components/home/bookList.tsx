import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Book } from "../../interface";
import BookCard from "./bookCard";

function BookList(props: any) {
    /*    const { books } = props; */
    const [books, setBooks] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    let limit = 5;

    useEffect(() => {
        const getBooks = async () => {
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
        };
        getBooks();
    }, [limit]);

    const fetchBooks = async (offset: number) => {
        const res = await fetch(
            `http://localhost:8080/api/books?offset=${offset}&limit=${limit}`
        );
        const data = await res.json();
        return data;
    };

    const handleClicked = async (data: any) => {
        let offset = data.selected * limit;
        const res = await fetchBooks(offset);
        setBooks(res.data);
        // scroll to the top
        window.scrollTo(0, 0)
    };

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
};

export default BookList;