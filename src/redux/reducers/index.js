import {
	MOD_ISLOGIN,
	SET_USER,
	CLEAR_USER,
	ADD_CART,
	REMOVE_CART,
	INIT_CART,
	SAVE_DB_CART,
	EMPTY_CART,
	CLEAR_ITEM_CART,
} from "../actions";

import {
	addToCartUtil,
	removeCartUtil,
	clearItemFromCartUtil,
} from "../../utils/cart";

const initialState = {
	isLogin: false,
	userInfo: {},
	cart: { userId: "", items: [] },
};

export const reducer = (state = initialState, { type, payload }) => {
	console.log("reducer running...");
	const cartItems = state.cart.items;
	switch (type) {
		case MOD_ISLOGIN:
			return { ...state, isLogin: payload };
		case SET_USER:
			return { ...state, userInfo: payload };
		case CLEAR_USER:
			return { ...state, userInfo: {} };
		case ADD_CART:
			return addToCartUtil(state, cartItems, payload);
		case REMOVE_CART:
			return removeCartUtil(state, cartItems, payload);
		case INIT_CART:
			return { ...state, cart: { ...state.cart, userId: payload } };
		case SAVE_DB_CART:
			return { ...state, cart: payload };
		case EMPTY_CART:
			return { ...state, cart: { userId: "", items: [] } };
		case CLEAR_ITEM_CART:
			return clearItemFromCartUtil(state, cartItems, payload);
		default:
			return state;
	}
};
