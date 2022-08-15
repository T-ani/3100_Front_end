import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../Styles/additem.scss";


const Add_Item = ({ isPopupOpen, setIsPopupOpen }) => {
	const [medName, setMedname] = useState("");
	const [company, setCompany] = useState("");
	const [specification, setSpecification] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState();
	const [imageURL, setImageURL] = useState("");
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	const axios = require("axios");

	function handleSave(e) {
		e.preventDefault();
		if (
			medName === "" ||
			company === "" ||
			specification === "" ||
			price === "" ||
			imageURL === ""
		) {
			setError("Please fill all the fields");
			return;
		}

		setError(null);

		const config = {
			headers: {
				token: localStorage.getItem("token"),
				"Content-Type": "multipart/form-data",
			},
		};

		const formData = new FormData();
		formData.append("medName", medName);
		formData.append("company", company);
		formData.append("specification", specification);
		formData.append("price", price);
		formData.append("image", image);

		axios
			.post(
				"http://localhost:3010/medicine/createMedicine",
				formData,
				config
			)
			.then((result) => {
				if (result.status === 200) {
					console.log(result.data.message);
					setError(result.data.message);
				}
			})
			.catch((error) => {
				console.log(error);
				// setError(error.response.data);
			});
	}

	const handleEnter = (event) => {
		if (event.key.toLowerCase() === "enter") {
			const form = event.target.form;
			const index = [...form].indexOf(event.target);
			form.elements[index + 1].focus();
			event.preventDefault();
		}
	};

	const onImageChange = (e) => {
		setImage(e.target.files[0]);
		setImageURL(URL.createObjectURL(e.target.files[0]));
	};

	return (
		<div >
			<form className="form-add-item">
				<h1>Upload a Medicine</h1>
				<input
					
					placeholder="Medicine-Name"
					onKeyDown={handleEnter}
					value={medName}
					onChange={(e) => setMedname(e.target.value)}
				></input>

				<input
				
					placeholder="Company"
					value={company}
					onChange={(e) => setCompany(e.target.value)}
					onKeyDown={handleEnter}
				></input>

				<input
					
					value={specification}
					onChange={(e) => setSpecification(e.target.value)}
					placeholder="Specification"
					onKeyDown={handleEnter}
				></input>

				<input
					
					placeholder="Price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					onKeyDown={handleEnter}
				></input>

				<div className="image">
					<img src={imageURL} alt="" width="80" height="80" />
					<input
						type="file"
						onChange={onImageChange}
						
					/>
				</div>
				{error && <div className="error">{error}</div>}

				<div className="button_popup" ><button onClick={(e) => handleSave(e)} >
					Save
				</button>
				<button
					className="button_danger"
					onClick={() => {
						setIsPopupOpen(!isPopupOpen);
					}}
				>
					Cancel
				</button></div>
				
			</form>
		</div>
	);
};
export default Add_Item;
