import { React, useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import "../common.css";
import { Input } from "antd";

const PasswordInput = ({
	label = "",
	value = "",
	placeholder = "",
	errorMessage = "",
	maxLength = 30,
	disabled = false,
	onChange = () => {},
}) => {
	const [passwordVisible, setPasswordVisible] = useState(false);

	return (
		<div className="text-input-container">
			{label ? <div className={"input-label"}>{label}</div> : null}
			<Input.Password
				maxLength={maxLength}
				className={errorMessage ? "text-input-error" : "text-input"}
				type={"text"}
				onChange={onChange}
				placeholder={placeholder}
				value={value}
				disabled={disabled}
				visibilityToggle={{
					visible: passwordVisible,
					onVisibleChange: setPasswordVisible,
				}}
			/>
			{errorMessage ? (
				<div className={"text-input-error-message"}>{errorMessage}</div>
			) : null}
		</div>
	);
};

export default PasswordInput;
