import { React } from "react";
import validator from "validator";
import { Button } from "antd";

import CONSTANT from "../../../../constant";
import { CONTENT } from "../../../../content";
import "../common.css";
import "./index.css";
import TextInput from "../../../../common/input/textInput";

const Form = ({
	modalType,
	setModalType,
	email,
	setEmail,
	isUpdatePasswordLinkSent,
	setIsUpdatePasswordLinkSent,
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
	const handleSubmit = () => {
		const emailError = validateEmailFEAndSetErrorMessage();
		if (emailError === "") {
			setIsUpdatePasswordLinkSent(true);
		}
	};

	return (
		<div>
			<h2>{CONTENT[modalType].MODAL_TITLE}</h2>
			<h5>{CONTENT[modalType].MSG}</h5>
			<TextInput
				value={email.value}
				label={CONSTANT.FORM_FIELD.EMAIL}
				errorMessage={email.errorMessage}
				onChange={(e) => setEmail({ ...email, value: e.target.value })}
			/>
			<Button className="submit-button" onClick={handleSubmit}>
				{CONTENT.FORGOT_PWD.BTN_TEXT}
			</Button>
			<div
				style={{ marginTop: "10px" }}
				onClick={() => setModalType(CONSTANT.MODAL_TYPE.SIGNIN)}
				dangerouslySetInnerHTML={{ __html: CONTENT.SIGNUP.SIGNIN_MSG }}
			/>
		</div>
	);
};

export default Form;
