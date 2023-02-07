import React, { useState } from "react";

import Modal from "../../common/modal";
import ModalContent from "./modalContent";

import CONSTANT from "../../constant";
import { CONTENT } from "../../content";
import useWindowSize from "../../utils";
import "./index.css";

const Signin = () => {
	const [visible, setVisible] = useState(false);
	const [modalType, setModalType] = useState(CONSTANT.MODAL_TYPE.SIGNIN);
	const size = useWindowSize();

	return (
		<>
			<button className="signin-btn" onClick={() => setVisible(true)}>
				{CONTENT.SIGNIN.BTN_TEXT}
			</button>
			<Modal
				width={Math.max(300, size.width * 0.35)}
				visible={visible}
				setVisible={setVisible}
			>
				<ModalContent modalType={modalType} setModalType={setModalType} />
			</Modal>
		</>
	);
};

export default Signin;
