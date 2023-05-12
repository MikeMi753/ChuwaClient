import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Select, Button, Pagination } from "antd";

import ProductCard from "../../common/card";
import { ajaxConfigHelper } from "../../api/helper";
import { isAdmin } from "../../utils/auth";
import "./index.css";

const Home = () => {
	const [products, setProducts] = useState([]);
	const [productsToDisplay, setProductsToDisplay] = useState([]);
	const [current, setCurrent] = useState(1);

	const isLogin = useSelector((state) => state.isLogin);

	useEffect(() => {
		loadProducts();
	}, []);

	const handlePageChange = (curPage) => {
		setCurrent(curPage);
	};

	const loadProducts = async () => {
		try {
			const response = await fetch(
				"/products",
				ajaxConfigHelper(null, null, "GET")
			);
			const result = await response.json();
			//console.log("result:", result);
			setProducts(result.products);
			setProductsToDisplay([...result.products].reverse());
			return;
		} catch (errors) {
			console.log(errors);
			return;
		}
	};

	const handleProductOrderChange = (value) => {
		//console.log(products);
		if (value === "lastAdded") {
			setProductsToDisplay([...products].reverse());
			return;
		} else if (value === "lowToHigh") {
			setProductsToDisplay(
				[...products].sort((p1, p2) => {
					if (p1.price < p2.price) {
						return -1;
					}
					if (p1.price > p2.price) {
						return 1;
					}
					return 0;
				})
			);
			return;
		} else {
			setProductsToDisplay(
				[...products].sort((p1, p2) => {
					if (p1.price < p2.price) {
						return 1;
					}
					if (p1.price > p2.price) {
						return -1;
					}
					return 0;
				})
			);
			return;
		}
	};

	const { Option } = Select;

	return (
		<div id="home-container">
			<div id="home-top-elements">
				<h2>Products</h2>
				<span id="two-btns">
					<Select
						defaultValue="lastAdded"
						style={{ width: "140px" }}
						onChange={(value) => handleProductOrderChange(value)}
					>
						<Option value="lastAdded">Last Added</Option>
						<Option value="lowToHigh">Price: low to high</Option>
						<Option value="highToLow">Price: high to low</Option>
					</Select>
					{isAdmin() ? (
						<Button>
							<Link to="addProduct">Add Product</Link>
						</Button>
					) : null}
				</span>
			</div>
			<div id="cards-container">
				{productsToDisplay.length > 0
					? productsToDisplay
							.slice(10 * (current - 1), 10 * current)
							.map((product) => <ProductCard productInfo={product} />)
					: null}
			</div>
			<div id="pagination-container">
				{productsToDisplay.length > 0 ? (
					<Pagination
						current={current}
						pageSize={10}
						total={productsToDisplay.length}
						onChange={handlePageChange}
					/>
				) : null}
			</div>
		</div>
	);
};

export default Home;
