import { Link } from 'react-router-dom';
import BookList from '../../components/home/bookList';
import { stockData } from '../../data';

function Home() {
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
      <BookList />
    </div>
  );
}

export default Home;
