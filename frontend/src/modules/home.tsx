import { useState } from "react";
function Home(){
    const [books, setBooks] = useState([
        {
            id: 1,
            title: "bla bla",
            author: "uncle bob",
            price: 23,
        },
        {
            id: 2,
            title: "Orgoglio e pregiudizio",
            author: "Jane Austen",
            price: 23,
        }, {
            id: 3,
            title: "The clean coder",
            author: "uncle bob",
            price: 23,
        }
    ,])
	return (
		<div className="home">Lista libri</div>
	);
}

export default Home;