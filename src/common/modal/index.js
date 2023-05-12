import React from "react";
import "antd/dist/antd.css";
import { Modal } from "antd";
import "./index.css";
import CONSTANT from "../../constant";

const MyModal = (props) => {
	const {
		children,
		width,
		visible,
		setVisible = () => {},
		setModalType = () => {},
	} = props;
	return (
		<>
			<Modal
				width={width}
				visible={visible}
				footer={null}
				onCancel={() => {
					setVisible(false);
					setModalType(CONSTANT.MODAL_TYPE.SIGNIN);
				}}
				mask={false}
				destroyOnClose={true}
			>
				{children}
			</Modal>
		</>
	);
};

export default MyModal;
