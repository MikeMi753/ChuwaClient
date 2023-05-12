import { React } from "react";
import validator from "validator";
import { Button, message } from "antd";
import { decode } from "jsonwebtoken";

import CONSTANT from "../../../../constant";
import { CONTENT } from "../../../../content";
import "../common.css";
import TextInput from "../../../../common/input/textInput";
import PasswordInput from "../../../../common/input/passwordInput";
import { ajaxConfigHelper } from "../../../../api/helper";
import { authenticate, getCookie } from "../../../../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import {
	modIsLogin,
	setUser,
	initCart,
	saveDBCart,
} from "../../../../redux/actions";

const MyForm = ({
	action,
	modalType,
	email,
	setEmail,
	password,
	setPassword,
	setVisible,
}) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);

	const validateEmailFEAndSetErrorMessage = () => {
		let errorMessage = "";
		if (!validator.isEmail(email.value)) {
			errorMessage = CONTENT.ERROR_MSG.EMAIL;
		}
		setEmail({
			...email,
			errorMessage,
		});
		return errorMessage;
	};

	const validatePasswordFEAndSetErrorMessage = () => {
		let errorMessage = "";
		if (!password.value) {
			errorMessage = CONTENT.ERROR_MSG.PASSWORD;
		}
		setPassword({
			...password,
			errorMessage,
		});
		return errorMessage;
	};

	const handleSubmit = async () => {
		const emailError = validateEmailFEAndSetErrorMessage();
		const passwordError = validatePasswordFEAndSetErrorMessage();
		if (!emailError && !passwordError) {
			const response = await fetch(
				action,
				ajaxConfigHelper({ email: email.value, password: password.value })
			);
			const result = await response.json();
			//console.log(result);
			if (result.message) {
				//console.log(result);
				//console.log(decode(result.token));
				message.success(result.message);
				setVisible(false);
				authenticate(result);
				const { _id, isAdmin } = decode(result.token);
				setUser(dispatch)({ _id, isAdmin });
				modIsLogin(dispatch)(true);
				if (action === "/signin") {
					// load/initialize cart
					const cartResponse = await fetch(
						`/cart/${_id}`,
						ajaxConfigHelper(null, getCookie("token"), "GET")
					);
					const cartResult = await cartResponse.json();
					//console.log("signin cart result:", cartResult);
					const localCart = JSON.parse(localStorage.getItem("cart"));
					if (cartResult.message) {
						// cart not found in DB
						if (!localCart) {
							// no local cart, no need to merge
							initCart(dispatch)(_id);
							const saveCartResponse = await fetch(
								"/saveCart",
								ajaxConfigHelper({ userId: _id, items: [] }, getCookie("token"))
							);
							const saveCartResult = await saveCartResponse.json();
							console.log(saveCartResult);
						} else {
							// init redux cart with local cart, and save to DB
							saveDBCart(dispatch)({
								userId: _id,
								items: localCart.items,
							});
							await fetch(
								"/saveCart",
								ajaxConfigHelper(
									{
										userId: _id,
										items: localCart.items,
									},
									getCookie("token")
								)
							);
							localStorage.removeItem("cart");
						}
					} else {
						// save cart from DB to redux, merge with local cart if there is one
						const { userId, items } = cartResult.cart;
						if (localCart) {
							//console.log("localcart:", localCart);
							for (let localCartItem of localCart.items) {
								const index = items.findIndex(
									(ele) => ele.productId === localCartItem.productId
								);
								if (index !== -1) {
									items[index].quantity =
										items[index].quantity + localCartItem.quantity;
								} else {
									items.push(localCartItem);
								}
							}
							localStorage.removeItem("cart");
							await fetch(
								"/saveCart",
								ajaxConfigHelper({ userId, items }, getCookie("token"))
							);
						}
						saveDBCart(dispatch)({ userId, items });
					}
				} else {
					// user sign up
					const localCart = JSON.parse(localStorage.getItem("cart"));
					if (localCart) {
						await fetch(
							"/saveCart",
							ajaxConfigHelper(
								{
									userId: _id,
									items: localCart.items,
								},
								getCookie("token")
							)
						);
						saveDBCart(dispatch)({
							userId: _id,
							items: localCart.items,
						});
						localStorage.removeItem("cart");
					} else {
						await fetch(
							"/saveCart",
							ajaxConfigHelper({ userId: _id, items: [] }, getCookie("token"))
						);
						initCart(dispatch)(_id);
					}
				}
				return;
			}
			if (result.errorEmail) {
				setEmail({
					...email,
					errorMessage: result.errorEmail,
				});
			}
			if (result.errorPassword) {
				setPassword({
					...password,
					errorMessage: result.errorPassword,
				});
			}
		}
	};

	return (
		<>
			<h2>{CONTENT[modalType].MODAL_TITLE}</h2>
			<TextInput
				value={email.value}
				label={CONSTANT.FORM_FIELD.EMAIL}
				errorMessage={email.errorMessage}
				onChange={(e) => setEmail({ ...email, value: e.target.value })}
			/>
			<PasswordInput
				value={password.value}
				label={CONSTANT.FORM_FIELD.PASSWORD}
				errorMessage={password.errorMessage}
				onChange={(e) => setPassword({ ...email, value: e.target.value })}
			/>
			<Button className="submit-button" onClick={handleSubmit}>
				{CONTENT[modalType].BTN_TEXT}
			</Button>
		</>
	);
};

export default MyForm;
