import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Book } from "../../interface";
import BookCard from "./bookCard";

function BookList(props: any) {
    const { books } = props;
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    let limit = 15;

    useEffect(() => {
        const getBooks = async () => {
            const res = await fetch(
                `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${limit}`
            );
            const data = await res.json();
            const total: any = res.headers.get("x-total-count");
            setpageCount(Math.ceil(total / limit));
            // console.log(Math.ceil(total/12));
            setItems(data);
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

    const handlePageClick = async (data: any) => {
        console.log(data.selected);

        let currentPage = data.selected + 1;

        const commentsFormServer = await fetchBooks(currentPage);

        setItems(commentsFormServer);
        // scroll to the top
        //window.scrollTo(0, 0)
    };

    return (
        <React.Fragment>
            <div className="booklist">
                {items.map((book: Book) => (
                    <BookCard book={book} key={book.id} />
                ))}
            </div>
            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                pageClassName={"pagination__item"}
                pageLinkClassName={"pagination__link"}
                previousClassName={"pagination__item"}
                previousLinkClassName={"pagination__link"}
                nextClassName={"pagination__item"}
                nextLinkClassName={"pagination__link"}
                breakClassName={"pagination__item"}
                breakLinkClassName={"pagination__link"}
                activeClassName={"pagination__item--active"}
                activeLinkClassName={"pagination__link--active"} />
        </React.Fragment>
    );
};

export default BookList;