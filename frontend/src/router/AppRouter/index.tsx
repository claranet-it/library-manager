import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Create, Detail, Edit, Error, Home } from '../../pages';
import Footer from '../../shared/components/layout/footer';
import Header from '../../shared/components/layout/header';

export default function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/*  <Route path='/:bookId' element={<Book/>}/>*/}
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" replace={true} />} />
      </Routes>
      <Footer />
    </Router>
  );
}
