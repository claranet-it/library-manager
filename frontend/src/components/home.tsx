import { useState } from "react";
import { Book } from "../interface";
import BookList from "./home/bookList";
function Home(){
    const [books, setBooks] = useState<Book[]>([
        {
            id: 1,
            title: "Extreme Contracts: Il knowledge work dalla negoziazione alla collaborazione",
            author: "Jacopo Romei",
            price: 9.99,
        },
        {
            id: 2,
            title: "Extreme Programming Explained: Embrace Change",
            author: "Kent Beck",
            price: 37.86,
        }, 
        {
            id: 3,
            title: "User Stories Applied: For Agile Software Development",
            author: "Cohn Mike",
            price: 41.07,
        },
        {
            id: 4,
            title: "The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses",
            author: "Eric Ries",
            price: 25.17,
        },
        {
            id: 5,
            title: "Start Small, Stay Small: A Developer's Guide to Launching a Startup",
            author: "Rob Walling",
            price: 21.32,
        }
    ])

	return (
        <div className="page">
            <div className="actions">
                <div className="title">Lista libri</div>
                <div><button className="add" onClick={()=>{console.log("##### vai a nuova pagina")}}>Aggiungi nuovo libro</button></div>
            </div>
		    <BookList books={books}/>
        </div>
	);
}

export default Home;