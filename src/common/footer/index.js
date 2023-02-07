import React from "react";
import "./index.css";

import youtube from "../../image/youtube.png";
import twitter from "../../image/twitter.png";
import facebook from "../../image/facebook.png";

const Footer = (props) => {
	return (
		<footer id="footer">
			<span id="copyright">&copy;2022 All Rights Reserved.</span>
			<span id="social-media-icon">
				<img src={youtube} alt="" />
				<img src={twitter} alt="" />
				<img src={facebook} alt="" />
			</span>
			<span id="links">
				<a href=".">Contact us</a>
				<a href=".">Privacy Policies</a>
				<a href=".">Help</a>
			</span>
		</footer>
	);
};

export default Footer;
