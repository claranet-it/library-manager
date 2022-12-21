import React, { useState } from 'react';
import './assets/app.css';
import Footer from './modules/footer';
import Header from './modules/header';
import Home from './modules/home';

function App() {
	return (
		<React.Fragment>
			<Header/>
			<Home/>
			<Footer/>
		</React.Fragment>
	);
}

export default App;
