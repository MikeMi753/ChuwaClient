import React from "react";
import "antd/dist/antd.css";
import { Modal } from "antd";
import "./index.css";

const MyModal = (props) => {
	const { children, width, visible, setVisible = () => {} } = props;
	return (
		<>
			<Modal
				width={width}
				visible={visible}
				footer={null}
				onCancel={() => setVisible(false)}
				mask={false}
				destroyOnClose={true}
			>
				{children}
			</Modal>
		</>
	);
};

export default MyModal;
