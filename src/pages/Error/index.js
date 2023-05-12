import React from "react";
import { useNavigate } from "react-router-dom";

import exclamationCircle from "../../image/exclamation-circle.png";
import "./index.css";

const Error = () => {
	const navigate = useNavigate();

	return (
		<div id="error-page-container">
			<img src={exclamationCircle} alt="" />
			<div>Oops, something went wrong!</div>
			<button onClick={() => navigate("/")}>Go Home</button>
		</div>
	);
};

export default Error;
