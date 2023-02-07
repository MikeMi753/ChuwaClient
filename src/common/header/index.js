import React from "react";
import "./index.css";
import { Input } from "antd";

import Signin from "../../components/signin";

import person from "../../image/person.png";
import cart from "../../image/cart.png";

const Header = (props) => {
	return (
		<header id="header">
			<span id="brand">
				<b>
					M<span>anagement </span>
				</b>
				<small>Chuwa</small>
			</span>
			<Input.Search placeholder="Search" className="search-box" />
			<span className="navbar-button">
				<span className="signin">
					<img src={person} alt="" />
					<Signin />
				</span>
				<span className="cart">
					<img src={cart} alt="" />
					$0.00
				</span>
			</span>
		</header>
	);
};

export default Header;
