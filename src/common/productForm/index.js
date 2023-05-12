import React from "react";
import { Form, Input, InputNumber, Select, Button, Row, Col } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./index.css";
import imagePreview from "../../image/imagePreview.png";
import { ajaxConfigHelper } from "../../api/helper";
import { getCookie } from "../../utils/auth";

const ProductForm = ({
	productId = "",
	productInfo,
	setProductInfo,
	title,
	btnText,
	isEdit = false,
}) => {
	const { Option } = Select;
	const navigate = useNavigate();
	const user = useSelector((state) => state.userInfo);
	const [form] = Form.useForm();

	const handleUpload = () => {
		const imageLink = form.getFieldValue("image");
		const image = document.querySelector(".productForm img");
		image.setAttribute("src", imageLink);
	};

	const handleSubmit = async () => {
		//console.log("redirecting...");

		try {
			await form.validateFields();
			// Validation is successful
			let response;
			const currentUserId = user._id;
			if (!isEdit) {
				response = await fetch(
					"/addProduct",
					ajaxConfigHelper({ currentUserId, productInfo }, getCookie("token"))
				);
			} else {
				response = await fetch(
					`/product/${productId}`,
					ajaxConfigHelper(
						{ currentUserId, productInfo },
						getCookie("token"),
						"PUT"
					)
				);
			}
			const result = await response.json();
			console.log(result);
			if (result.error) {
				//console.log(result.error);
				navigate("/error");
				return;
			}
			navigate("/");
			return;
		} catch (errors) {
			console.log(errors);
			navigate("/error");
			return;
		}
	};

	return (
		<>
			<h2 id="form-title">{title}</h2>
			<div className="productForm">
				<Form
					form={form}
					requiredMark={false}
					layout={"vertical"}
					initialValues={productInfo}
					onValuesChange={(_, allValues) => {
						setProductInfo({
							...allValues,
							//price: Number(allValues.price),
							//quantity: Number(allValues.quantity),
						});
					}}
				>
					<Form.Item
						label="Product Name"
						name="name"
						rules={[{ required: true, message: "Please input product name!" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Product Description"
						name="description"
						rules={[
							{ required: true, message: "Please input product description!" },
						]}
					>
						<Input.TextArea id="description-box" />
					</Form.Item>
					<Row justify="space-between">
						<Col xs={{ span: 24 }} md={{ span: 12 }}>
							<Form.Item
								label="Category"
								name="category"
								rules={[
									{
										required: true,
										message: "Please select product category!",
									},
								]}
							>
								<Select>
									<Option value="Category1">Category1</Option>
									<Option value="Category2">Category2</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 11 }}>
							<Form.Item
								label="Price"
								name="price"
								rules={[
									{
										type: "number",
										min: 0,
										required: true,
										message: "Please input valid product price!",
									},
								]}
							>
								<InputNumber placeholder="$" style={{ width: "100%" }} />
							</Form.Item>
						</Col>
					</Row>
					<Row justify="space-between">
						<Col xs={{ span: 24 }} md={{ span: 6 }}>
							<Form.Item
								label="In Stock Quantity"
								name="quantity"
								rules={[
									{
										type: "number",
										min: 0,
										required: true,
										message: "Please input valid product in stock quantity!",
									},
								]}
							>
								<InputNumber style={{ width: "100%" }} />
							</Form.Item>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 17 }}>
							<Form.Item
								label="Add Image Link"
								name="image"
								rules={[
									{ required: true, message: "Please add product image link!" },
								]}
							>
								<Input
									placeholder="http://"
									suffix={
										<Button
											className="my-btn"
											size="small"
											onClick={handleUpload}
										>
											Upload
										</Button>
									}
									size="middle"
								/>
							</Form.Item>
						</Col>
					</Row>
					<Form.Item>
						<div id="image-preview-container">
							<img src={isEdit ? productInfo.image : imagePreview} alt="" />
						</div>
					</Form.Item>
					<Form.Item>
						<Button className="my-btn" htmlType="submit" onClick={handleSubmit}>
							{btnText}
						</Button>
						<Button style={{ marginLeft: "15px" }}>
							<Link to="/">Cancel</Link>
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
};

export default ProductForm;
