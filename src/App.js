import React from "react";
import Main from "./components/Main";
import Header from "./common/header";
import Footer from "./common/footer";

import "./App.css";

function App() {
	return (
		<div id="main-wrapper">
			<Header />
			<Main />
			<Footer />
		</div>
	);
}

export default App;
