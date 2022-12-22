function BookCard(props: any) {
    const { book } = props;

    return (
        <div className="booklist__card">
            <div className="booklist__card__title">{book.title}</div>
            <div className="booklist__card__author">{book.author}</div>
            <div className="booklist__card__price">{book.price}</div>
        </div >
    );
}

export default BookCard;