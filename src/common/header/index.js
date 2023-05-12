import React from "react";
import { useEffect, useState } from "react";
import "./index.css";
import { Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decode } from "jsonwebtoken";

import { ajaxConfigHelper } from "../../api/helper";
import Signin from "../../components/signin";
import {
	modIsLogin,
	setUser,
	clearUser,
	saveDBCart,
	emptyCart,
} from "../../redux/actions";
import { logout, isAuth, getCookie } from "../../utils/auth";
import CartModal from "../cartModal";

import person from "../../image/person.png";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLogin = useSelector((state) => state.isLogin);
	const user = useSelector((state) => state.userInfo);

	useEffect(() => {
		const loadCart = async () => {
			if (isAuth()) {
				console.log("Inside header useEffect...");
				//console.log(JSON.parse(localStorage.getItem("user"))._id);
				const cartResponse = await fetch(
					`/cart/${decode(getCookie("token"))._id}`,
					ajaxConfigHelper(null, getCookie("token"), "GET")
				);
				const cartResult = await cartResponse.json();
				const { userId, items } = cartResult.cart;
				saveDBCart(dispatch)({ userId, items });
			} else {
				const localCart = JSON.parse(localStorage.getItem("cart"));
				if (localCart) {
					saveDBCart(dispatch)(localCart);
				}
			}
		};

		loadCart();

		if (isAuth()) {
			modIsLogin(dispatch)(true);
			const { _id, isAdmin } = decode(getCookie("token"));
			//setLocalStorage("user", { _id, isAdmin });
			setUser(dispatch)({ _id, isAdmin });
		}
	}, []);

	const handleSignout = () => {
		logout();
		clearUser(dispatch)();
		modIsLogin(dispatch)(false);
		emptyCart(dispatch)();
		localStorage.removeItem("cart");
		message.success("Sign out successful.");
	};

	return (
		<header id="header">
			<span id="brand" onClick={() => navigate("/")}>
				<b>
					M<span>anagement </span>
				</b>
				<small>Chuwa</small>
			</span>
			<Input.Search placeholder="Search" className="search-box" />
			<span className="navbar-button">
				<span className="signin">
					<img src={person} alt="" />
					{isLogin ? (
						<button id="signout-btn" onClick={handleSignout}>
							Sign Out
						</button>
					) : (
						<Signin />
					)}
				</span>
				{/* <span className="cart">
					<img src={cart} alt="" />
					$0.00
				</span> */}
				<CartModal />
			</span>
		</header>
	);
};

export default Header;
