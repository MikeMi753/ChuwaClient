import React from "react";
import { Button, Row, Col, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { addToCart, removeFromCart } from "../../redux/actions";
import { ajaxConfigHelper } from "../../api/helper";
import { addToCartUtil, removeCartUtil } from "../../utils/cart";
import { isAuth, isAdmin } from "../../utils/auth";
import { setLocalStorage, getCookie } from "../../utils/auth";
import "./index.css";

const ProductCard = ({ productInfo }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	//const cartItems = useSelector((state) => state.cart.items);
	//const [cartStale, setCartStale] = useState(false);
	//console.log(cartItems.some((ele) => ele.productId === productInfo._id));

	// useEffect(() => {
	// 	const saveCart = async () => {
	// 		if (cartStale) {
	// 			const saveCartResponse = await fetch(
	// 				"/saveCart",
	// 				ajaxConfigHelper(cart)
	// 			);
	// 			setCartStale(false);
	// 			console.log("cart updated");
	// 		}
	// 	};
	// 	saveCart();
	// }, [cart, cartStale]);

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
		//addToCart(dispatch)(productInfo._id);
		//setCartStale(true);
		// const saveCartResponse = await fetch("/saveCart", ajaxConfigHelper(cart));
		// const saveCartResult = await saveCartResponse.json();
		//console.log(saveCartResult);
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
		//setCartStale(true);
		// const saveCartResponse = await fetch("/saveCart", ajaxConfigHelper(cart));
		// const saveCartResult = await saveCartResponse.json();
		//console.log(saveCartResult);
	};

	return (
		<div className="card-wrapper">
			<img
				alt="example"
				src={productInfo.image}
				onClick={() => navigate(`/product/${productInfo._id}`)}
			/>
			<h4>{productInfo.name}</h4>
			<h5>${(Math.round(productInfo.price * 100) / 100).toFixed(2)}</h5>
			<Row justify="space-between">
				<Col span={11}>
					{!cart.items.some((ele) => ele.productId === productInfo._id) ? (
						<Button
							size="small"
							style={{
								width: "100%",
								color: "white",
								backgroundColor: "rgb(90, 8, 214)",
							}}
							onClick={handleAddProduct}
						>
							Add
						</Button>
					) : (
						<Input
							size="small"
							disabled
							prefix={<span onClick={handleRemoveProduct}>-</span>}
							suffix={<span onClick={handleAddProduct}>+</span>}
							value={
								cart.items.find((ele) => ele.productId === productInfo._id)
									.quantity
							}
						/>
					)}
				</Col>
				{isAdmin() ? (
					<Col span={11}>
						<Button size="small" style={{ width: "100%" }}>
							<span className="edit-btn-txt">
								<Link to={`/editProduct/${productInfo._id}`}>Edit</Link>
							</span>
						</Button>
					</Col>
				) : null}
			</Row>
		</div>
	);
};

export default ProductCard;
