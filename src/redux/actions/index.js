export const MOD_ISLOGIN = "MOD_ISLOGIN";
export const modIsLogin = (dispatch) => (value) => {
	dispatch({
		type: MOD_ISLOGIN,
		payload: value,
	});
};

export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";
export const setUser = (dispatch) => (user) => {
	dispatch({
		type: SET_USER,
		payload: user,
	});
};
export const clearUser = (dispatch) => () => {
	dispatch({
		type: CLEAR_USER,
	});
};

export const ADD_CART = "ADD_CART";
export const REMOVE_CART = "REMOVE_CART";
export const INIT_CART = "INIT_CART";
export const SAVE_DB_CART = "SAVE_DB_CART";
export const EMPTY_CART = "EMPTY_CART";
export const CLEAR_ITEM_CART = "CLEAR_ITEM_CART";
export const addToCart = (dispatch) => (productId) => {
	dispatch({
		type: ADD_CART,
		payload: productId,
	});
};
export const removeFromCart = (dispatch) => (productId) => {
	dispatch({
		type: REMOVE_CART,
		payload: productId,
	});
};
export const initCart = (dispatch) => (userId) => {
	dispatch({
		type: INIT_CART,
		payload: userId,
	});
};
export const saveDBCart = (dispatch) => (cart) => {
	dispatch({
		type: SAVE_DB_CART,
		payload: cart,
	});
};
export const emptyCart = (dispatch) => () => {
	dispatch({
		type: EMPTY_CART,
	});
};
export const clearItemFromCart = (dispatch) => (productId) => {
	dispatch({
		type: CLEAR_ITEM_CART,
		payload: productId,
	});
};
