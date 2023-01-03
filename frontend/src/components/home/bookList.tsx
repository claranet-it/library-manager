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
                    'Access-Control-Allow-Methods': 'GET, OPTIONS',
                    'Access-Control-Allow-Origin': '*',
                    'contentType': 'application/json'
                },

            };
            const res = await fetch(
                `http://localhost:8080/api/books?offset=1&limit=${limit}`, requestOptions
            );
            const data = await res.json();
            const total: any = res.headers.get("x-total-count");
            setpageCount(Math.ceil(total / limit));
            setBooks(data);
        };
        getBooks();
    }, [limit]);

    const fetchBooks = async (currentPage: number) => {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
        );
        const data = await res.json();
        return data;
    };

    const handleClicked = async (data: any) => {
        let currentPage = data.selected + 1;
        const commentsFormServer = await fetchBooks(currentPage);
        setBooks(commentsFormServer);
        // scroll to the top
        //window.scrollTo(0, 0)
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