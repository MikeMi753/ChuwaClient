import { React } from "react";

import MyForm from "../common";

import CONSTANT from "../../../../constant";
import { CONTENT } from "../../../../content";
import "./index.css";
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
				action="/signin"
				modalType={modalType}
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
				setVisible={setVisible}
			/>
			<div className="container">
				<div
					onClick={() => setModalType(CONSTANT.MODAL_TYPE.SIGNUP)}
					dangerouslySetInnerHTML={{ __html: CONTENT.SIGNIN.SIGNUP_MSG }}
				/>
				<a onClick={() => setModalType(CONSTANT.MODAL_TYPE.FORGOT_PWD)}>
					{CONTENT.SIGNIN.FORGOT_PWD_MSG}
				</a>
			</div>
		</div>
	);
};

export default Form;
