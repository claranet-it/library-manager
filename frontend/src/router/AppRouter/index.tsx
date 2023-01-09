import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Create from '../../views/create';
import { Detail } from '../../views/detail';
import Error from '../../views/error';
import Home from '../../views/home';

export default function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/*  <Route path='/:bookId' element={<Book/>}/>*/}
        <Route path="/create" element={<Create />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/error" element={<Error />} />
        <Route path="/*" element={<Navigate to="/error" replace={true} />} />
      </Routes>
      <Footer />
    </Router>
  );
}
