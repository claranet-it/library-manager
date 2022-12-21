import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/css/app.css';
import Error from './components/error';
import Footer from './components/footer';
import Header from './components/header';
import Home from './components/home';


function App() {
	return (
	<Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
       {/*  <Route path='/:bookId' element={<Book/>}/>*/}
        <Route path='/*' element={<Error/>}/> 
      </Routes>
      <Footer />
    </Router>
	);
}

export default App;
