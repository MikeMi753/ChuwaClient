import { React } from "react";

import MyForm from "../common";

import CONSTANT from "../../../../constant";
import { CONTENT } from "../../../../content";
import "../common.css";

const Form = ({
	modalType,
	setModalType,
	email,
	setEmail,
	password,
	setPassword,
	setVisible,
}) => {
	return (
		<div>
			<MyForm
				action="/signup"
				modalType={modalType}
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
				setVisible={setVisible}
			/>
			<div
				style={{ marginTop: "10px" }}
				onClick={() => setModalType(CONSTANT.MODAL_TYPE.SIGNIN)}
				dangerouslySetInnerHTML={{ __html: CONTENT.SIGNUP.SIGNIN_MSG }}
			/>
		</div>
	);
};

export default Form;
