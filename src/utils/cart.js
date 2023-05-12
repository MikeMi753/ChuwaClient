export const addToCartUtil = (state, cartItems, payload) => {
	if (cartItems.length === 0) {
		// nothing in cart
		const item = { productId: payload, quantity: 1 };
		return { ...state, cart: { ...state.cart, items: [item] } };
	}
	if (cartItems.some((ele) => ele.productId === payload)) {
		// product already in cart
		const updatedItems = cartItems.map((ele) => {
			if (ele.productId !== payload) {
				return ele;
			} else {
				return { ...ele, quantity: ele.quantity + 1 };
			}
		});
		return { ...state, cart: { ...state.cart, items: updatedItems } };
	} else {
		// product not in cart
		return {
			...state,
			cart: {
				...state.cart,
				items: [...cartItems, { productId: payload, quantity: 1 }],
			},
		};
	}
};

export const removeCartUtil = (state, cartItems, payload) => {
	const updatedItems = cartItems
		.map((ele) => {
			if (ele.productId !== payload) {
				return ele;
			} else {
				return { ...ele, quantity: ele.quantity - 1 };
			}
		})
		.filter((ele) => ele.quantity !== 0);
	return { ...state, cart: { ...state.cart, items: updatedItems } };
};

export const clearItemFromCartUtil = (state, cartItems, payload) => {
	const updatedItems = cartItems.filter((ele) => ele.productId !== payload);
	return { ...state, cart: { ...state.cart, items: updatedItems } };
};
