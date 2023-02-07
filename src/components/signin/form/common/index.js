import { React } from "react";
import validator from "validator";
import { Button, message } from "antd";

import CONSTANT from "../../../../constant";
import { CONTENT } from "../../../../content";
import "../common.css";
import TextInput from "../../../../common/input/textInput";
import PasswordInput from "../../../../common/input/passwordInput";
import { ajaxConfigHelper } from "../../../../api/helper";

const MyForm = ({
	action,
	modalType,
	email,
	setEmail,
	password,
	setPassword,
}) => {
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
			console.log(result);
			if (result.message) {
				console.log(result.message);
				message.success(result.message);
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
