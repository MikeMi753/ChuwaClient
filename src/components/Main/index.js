import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../../pages/Home";
import AddProduct from "../../pages/AddProduct";
import EditProduct from "../../pages/EditProduct";
import ProductDetail from "../../pages/ProductDetail";
import Error from "../../pages/Error";

import "./index.css";

const Main = () => {
	return (
		<div id="main">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/addProduct" element={<AddProduct />} />
				<Route path="/editProduct/:id" element={<EditProduct />} />
				<Route path="/product/:id" element={<ProductDetail />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</div>
	);
};

export default Main;
