import React, { useState } from "react";

import SigninForm from "../form/signinForm";
import SignupForm from "../form/signupForm";
import UpdatePasswordForm from "../form/updatePasswordForm";

import "./index.css";
import CONSTANT from "../../../constant";
import emailSent from "../../../image/emailSent.png";

const ModalContent = ({ modalType, setModalType, setVisible }) => {
	const [email, setEmail] = useState({
		value: "",
		errorMessage: "",
	});
	const [password, setPassword] = useState({
		value: "",
		errorMessage: "",
	});
	const [isUpdatePasswordLinkSent, setIsUpdatePasswordLinkSent] =
		useState(false);

	if (modalType === CONSTANT.MODAL_TYPE.SIGNIN) {
		return (
			<SigninForm
				modalType={modalType}
				setModalType={setModalType}
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
				setVisible={setVisible}
			/>
		);
	} else if (modalType === CONSTANT.MODAL_TYPE.SIGNUP) {
		return (
			<SignupForm
				modalType={modalType}
				setModalType={setModalType}
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
				setVisible={setVisible}
			/>
		);
	} else {
		if (isUpdatePasswordLinkSent) {
			return (
				<div className="sentEmail">
					<img src={emailSent} alt="" />
					<div>
						<b>
							We have sent the update password link to your email. Please check
							your inbox!
						</b>
					</div>
				</div>
			);
		}
		return (
			<UpdatePasswordForm
				modalType={modalType}
				setModalType={setModalType}
				email={email}
				setEmail={setEmail}
				isUpdatePasswordLinkSent={isUpdatePasswordLinkSent}
				setIsUpdatePasswordLinkSent={setIsUpdatePasswordLinkSent}
			/>
		);
	}
};

export default ModalContent;
