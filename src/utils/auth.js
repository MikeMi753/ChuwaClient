import cookie from "js-cookie";
import { decode } from "jsonwebtoken";

// set cookie
export const setCookie = (key, value) => {
	// on client side
	cookie.set(key, value, {
		expires: 1, // expires in 1 day
	});
};

export const getCookie = (key) => {
	return cookie.get(key);
};

// remove from cookie
export const removeCookie = (key) => {
	// on client side
	cookie.remove(key);
};

// set local storage
export const setLocalStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

// remove from local storage
export const removeLocalStorage = (key) => {
	localStorage.removeItem(key);
};

// authenticate user by passing data to cookie and local storage during login
export const authenticate = (res) => {
	setCookie("token", res.token);
	//setLocalStorage("user", res.userInfo);
};

export const logout = () => {
	removeCookie("token");
	//removeLocalStorage("user");
};

// access user info from local storage
export const isAuth = () => {
	const cookieChecked = getCookie("token");
	// if (cookieChecked) {
	// 	if (localStorage.getItem("user")) {
	// 		return JSON.parse(localStorage.getItem("user"));
	// 	} else {
	// 		return false;
	// 	}
	// }
	return cookieChecked ? true : false;
};

export const isAdmin = () => {
	return isAuth() && decode(getCookie("token")).isAdmin;
};
