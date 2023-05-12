import React, { useEffect } from "react";
import { useState } from "react";
import { Badge, Modal, message, Input, Row, Col, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";

import cartImg from "../../image/cart.png";
import useWindowSize from "../../utils";
import { isAuth } from "../../utils/auth";
import { setLocalStorage, getCookie } from "../../utils/auth";
import { ajaxConfigHelper } from "../../api/helper";
import {
	addToCart,
	removeFromCart,
	clearItemFromCart,
} from "../../redux/actions";
import {
	addToCartUtil,
	removeCartUtil,
	clearItemFromCartUtil,
} from "../../utils/cart";
import "./index.css";

const CartModal = () => {
	const [visible, setVisible] = useState(false);
	const [productsInCartInfo, setProductsInCartInfo] = useState([]);
	const [subTotal, setSubTotal] = useState(0);

	const size = useWindowSize();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const cartSize = cart.items.reduce((sum, cur) => {
		return sum + cur.quantity;
	}, 0);

	useEffect(() => {
		const getProductsInCartInfo = async () => {
			if (cart.items.length > 0) {
				const productArray = [];
				let total = 0;
				try {
					for (let product of cart.items) {
						const response = await fetch(`/product/${product.productId}`);
						const result = await response.json();
						//console.log(result.product);
						const { _id, image, name, price } = result.product;
						productArray.push({ _id, image, name, price });
						total += product.quantity * price;
					}
					console.log(productArray);
					setProductsInCartInfo(productArray);
					setSubTotal(total);
					// setState() is async!!!!!!
					//console.log("products in cart info:", productsInCartInfo);
				} catch (err) {
					console.log(err);
					navigate("/error");
				}
			} else {
				setProductsInCartInfo([]);
				setSubTotal(0);
			}
		};
		getProductsInCartInfo();
	}, [cart]);

	const handleClick = () => {
		// if (!isAuth()) {
		// 	message.info("Please sign in first.");
		// } else {
		setVisible(true);
		// }
	};

	let style;
	if (size.width < 768) {
		style = null;
	} else {
		style = { top: 0, float: "right" };
	}

	const handleAddProduct = async (productId) => {
		try {
			const updatedCart = addToCartUtil(
				{ cart: cart },
				cart.items,
				productId
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
			addToCart(dispatch)(productId);
		} catch (err) {
			console.log(err);
			navigate("/error");
		}
	};

	const handleRemoveProduct = async (productId) => {
		try {
			const updatedCart = removeCartUtil(
				{ cart: cart },
				cart.items,
				productId
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
			removeFromCart(dispatch)(productId);
		} catch (err) {
			console.log(err);
			navigate("/error");
		}
	};

	const handleClearProduct = async (productId) => {
		try {
			const updatedCart = clearItemFromCartUtil(
				{ cart: cart },
				cart.items,
				productId
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
			clearItemFromCart(dispatch)(productId);
		} catch (err) {
			console.log(err);
			navigate("/error");
		}
	};

	const renderCart = () => {
		if (cart.items.length === 0) {
			return <div className="cart-empty">Your cart is empty</div>;
		} else {
			if (cart.items.length !== productsInCartInfo.length) {
				// need to wait for productsInCartInfo to be up-to-date
				return <div className="cart-empty">Loading...</div>;
			} else {
				return productsInCartInfo.map((ele) => (
					<div className="cart-product" key={ele._id}>
						<img alt="" src={ele.image} className="cart-product-image" />
						<div className="cart-product-items">
							<div className="cart-product-info">
								<span className="cart-product-name">{ele.name}</span>
								<span className="cart-product-price">
									${(Math.round(ele.price * 100) / 100).toFixed(2)}
								</span>
							</div>
							<div className="cart-product-action">
								<Row justify="space-between">
									<Col xs={{ span: 13 }} md={{ span: 9 }}>
										<Input
											size="small"
											disabled
											value={
												cart.items.find(
													(product) => product.productId === ele._id
												).quantity
											}
											addonBefore={
												<span
													className="cart-modify-count"
													onClick={() => handleRemoveProduct(ele._id)}
												>
													-
												</span>
											}
											addonAfter={
												<span
													className="cart-modify-count"
													onClick={() => handleAddProduct(ele._id)}
												>
													+
												</span>
											}
										/>
									</Col>
									<Col>
										<a onClick={() => handleClearProduct(ele._id)}>Remove</a>
									</Col>
								</Row>
							</div>
						</div>
					</div>
				));
			}
		}
	};

	return (
		<>
			<span className="cart" onClick={handleClick}>
				<Badge size="small" offset={[-8, 0]} count={cartSize}>
					<img src={cartImg} alt="" />
				</Badge>
				${subTotal.toFixed(2)}
			</span>
			<Modal
				visible={visible}
				onCancel={() => {
					setVisible(false);
				}}
				footer={null}
				width={Math.max(350, size.width * 0.35)}
				style={style}
				title={`Cart (${cartSize})`}
				closeIcon={<CloseOutlined style={{ color: "white" }} />}
			>
				<div className="cart-products-container">
					{renderCart()}
					{cart.items.length > 0 &&
					cart.items.length === productsInCartInfo.length ? (
						<div className="cart-subtotal-info">
							<div className="cart-promocode-section">
								<h4>Apply Discount Code</h4>
								<Row justify="space-between">
									<Col span={18}>
										<Input placeholder="20 DOLLAR OFF" />
									</Col>
									<Col>
										<Button>Apply</Button>
									</Col>
								</Row>
							</div>
							<hr />
							<div className="cart-price-row">
								<h3>Subtotal</h3>
								<h3>${subTotal.toFixed(2)}</h3>
							</div>
							<div className="cart-price-row">
								<h3>Tax</h3>
								<h3>${(subTotal * 0.1).toFixed(2)}</h3>
							</div>
							<div className="cart-price-row">
								<h3>Discount</h3>
								<h3>-$0.00</h3>
							</div>
							<div className="cart-price-row">
								<h3>Estimated Total</h3>
								<h3>${(subTotal * 1.1).toFixed(2)}</h3>
							</div>
							<Button size="large" style={{ width: "100%" }}>
								Continue to checkout
							</Button>
						</div>
					) : null}
				</div>
			</Modal>
		</>
	);
};

export default CartModal;
