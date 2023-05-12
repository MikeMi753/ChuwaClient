import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Input, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, removeFromCart } from "../../redux/actions";
import { ajaxConfigHelper } from "../../api/helper";
import { addToCartUtil, removeCartUtil } from "../../utils/cart";
import { isAuth } from "../../utils/auth";
import { setLocalStorage, getCookie } from "../../utils/auth";
import "./index.css";

const ProductDetail = () => {
	const [productInfo, setProductInfo] = useState({});
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		loadProduct();
	}, []);

	const loadProduct = async () => {
		try {
			const response = await fetch(
				`/product/${id}`,
				ajaxConfigHelper(null, null, "GET")
			);
			const result = await response.json();
			setProductInfo(result.product);
			return;
		} catch (errors) {
			console.log(errors);
			navigate("/error");
			return;
		}
	};

	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);

	const handleAddProduct = async () => {
		try {
			const updatedCart = addToCartUtil(
				{ cart: cart },
				cart.items,
				productInfo._id
			).cart;
			if (isAuth()) {
				const saveCartResponse = await fetch(
					"/saveCart",
					ajaxConfigHelper(updatedCart, getCookie("token"))
				);
				await saveCartResponse.json();
			} else {
				setLocalStorage("cart", updatedCart);
			}
			addToCart(dispatch)(productInfo._id);
		} catch (err) {
			console.log(err);
			navigate("/error");
		}
	};

	const handleRemoveProduct = async () => {
		try {
			const updatedCart = removeCartUtil(
				{ cart: cart },
				cart.items,
				productInfo._id
			).cart;
			if (isAuth()) {
				const saveCartResponse = await fetch(
					"/saveCart",
					ajaxConfigHelper(updatedCart, getCookie("token"))
				);
				await saveCartResponse.json();
			} else {
				setLocalStorage("cart", updatedCart);
			}
			removeFromCart(dispatch)(productInfo._id);
		} catch (err) {
			console.log(err);
			navigate("/error");
		}
	};

	return Object.keys(productInfo).length === 0 ? null : (
		<div id="product-detail-wrapper">
			<h2 id="product-detail-title">Product Details</h2>
			<div id="product-detail-container">
				<img id="product-image" src={productInfo.image} alt="" />
				<div id="product-detail">
					<h4>{productInfo.category}</h4>
					<h2 id="product-name">{productInfo.name}</h2>
					<h2>${(Math.round(productInfo.price * 100) / 100).toFixed(2)}</h2>
					<p>{productInfo.description}</p>
					<div id="product-detail-btns">
						<Row justify="space-between">
							<Col span={11}>
								{!cart.items.some(
									(ele) => ele.productId === productInfo._id
								) ? (
									<Button
										size="large"
										style={{
											color: "white",
											backgroundColor: "rgb(90, 8, 214)",
											width: "100%",
										}}
										onClick={handleAddProduct}
									>
										Add To Cart
									</Button>
								) : (
									<Input
										size="large"
										disabled
										prefix={<span onClick={handleRemoveProduct}>-</span>}
										suffix={<span onClick={handleAddProduct}>+</span>}
										value={
											cart.items.find(
												(ele) => ele.productId === productInfo._id
											).quantity
										}
									/>
								)}
							</Col>
							<Col span={11}>
								<Button size="large" style={{ width: "100%" }}>
									<span className="edit-btn-txt">
										<Link to={`/editProduct/${productInfo._id}`}>Edit</Link>
									</span>
								</Button>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
