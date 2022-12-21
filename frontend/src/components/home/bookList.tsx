import { Book } from "../../interface";
import BookCard from "./bookCard";

function BookList(props:any) {
    const { books } = props;

    return (
        <div className="booklist">
            {books.map((book: Book) => (
                <BookCard book={book} key={book.id}/>
            ))}
        </div>
    );
};

export default BookList;