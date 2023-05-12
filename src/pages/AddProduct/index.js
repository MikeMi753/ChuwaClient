import React from "react";
import { useState } from "react";

import ProductForm from "../../common/productForm";

const AddProduct = () => {
	const [productInfo, setProductInfo] = useState({
		name: "",
		description: "",
		category: "",
		price: null,
		quantity: null,
		image: "",
	});

	return (
		<ProductForm
			productInfo={productInfo}
			setProductInfo={setProductInfo}
			title="Create Product"
			btnText="Add Product"
		/>
	);
};

export default AddProduct;
