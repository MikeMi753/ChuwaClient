import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ProductForm from "../../common/productForm";
import { ajaxConfigHelper } from "../../api/helper";

const EditProduct = () => {
	const [productInfo, setProductInfo] = useState({});
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		loadProduct();
	}, []);

	const loadProduct = async () => {
		try {
			const response = await fetch(
				`/product/${id}`,
				ajaxConfigHelper(null, null, "GET")
			);
			const result = await response.json();
			const { name, description, category, price, quantity, image } =
				result.product;
			setProductInfo({ name, description, category, price, quantity, image });
			return;
		} catch (errors) {
			console.log(errors);
			navigate("/error");
			return;
		}
	};

	return Object.keys(productInfo).length === 0 ? null : (
		<ProductForm
			productId={id}
			productInfo={productInfo}
			setProductInfo={setProductInfo}
			title="Edit Product"
			btnText="Update Product"
			isEdit={true}
		/>
	);
};

export default EditProduct;
