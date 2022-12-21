function BookCard(props:any){
    const {book} = props; 

	return (
    <div className="booklist__card">
       {book.title}
       {book.author}
       {book.price}
    </div >
	);
}

export default BookCard;