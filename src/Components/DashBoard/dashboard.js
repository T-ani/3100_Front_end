import React, { useEffect } from "react";
import { useState } from "react";
import { delStorage, loadStorage } from "../../LocalStorage/localStorage";
import Update from "../../Pages";
import Home from "../../Pages";
import Add_Item from "../../Pages/add_item";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./../../Styles/dashBoard.css";
import axios from "axios";

const Dashboard = () => {
	const MAT_URL = "http://localhost:3010/static/";
	const [products, setProducts] = useState([]);
	const [shop, setShop] = useState({});
	const navigate = useNavigate();

	const user = loadStorage("user");

	const [isPopupOpen, setIsPopupOpen] = useState(false);

	useEffect(() => {
		axios({
			method: "get",
			url: "http://localhost:3010/medicine/getMedicineByShop",
			headers: {
				"Content-Type": "application/json",
				token: localStorage.getItem("token"),
			},
		})
			.then((result) => {
				if (result.status === 200) {
					console.log(result.data);
					setProducts(result.data.result["medicine"]);
					setShop(result.data.result["shop"]);
				}
			})
			.catch((error) => {
				console.log(error);
				// setError(error.response.data);
			});
	}, [isPopupOpen]);

	return (
		<>
			<Header />

			<>
				{isPopupOpen && (
					<div class="popup">
						<div className="upload">
							<Add_Item
								isPopupOpen={isPopupOpen}
								setIsPopupOpen={setIsPopupOpen}
							/>
						</div>
					</div>
				)}

				<div class="center_row">
					<div className="per-info">
						<div className="card-profile">
							<div className="field_1">
								<label style={{ margintop: "20px" }}>
									Shop Name
								</label>
								<input
									type="text"
									className="input_n"
									placeholder={user.userName}
									readOnly={true}
								/>
							</div>
							<div className="field">
								<label>Email</label>
								<input
									type="text"
									className="input_n"
									placeholder={user.email}
									readOnly={true}
								/>
							</div>

							<div className="field">
								<label>Phone Number</label>
								<input
									type="text"
									className="input_n"
									placeholder={user.phoneNumber}
									readOnly={true}
								/>
							</div>
							<br></br>

							<button
								className="button"
								onClick={() => setIsPopupOpen(!isPopupOpen)}
							>
								Add Item
							</button>
							<button
								className="button"
								onClick={() => {
									delStorage("user");
									navigate("/sign-in");
								}}
							>
								Log Out
							</button>
						</div>
					</div>
				</div>

				<div className="product_sec">
					<div className="title">My Items</div>
					<div className="items">
						{products.map((item, key) => {
							return (
								<div key={key} className="medicine_card">
									<div>
										<div className="card-img">
											<img
												className="img_sty"
												src={MAT_URL + item.image}
												// width="30"
												// height="30"
											/>
										</div>
										<div>
											<div className="medicine-details">
												<h3>{item.medName}</h3>
												<p>{item.price} BDT</p>
												<p>{item.specification}</p>
											</div>
											<div className="medicine-details-1">
												<span>
													Shop name : {shop.userName}
												</span>

												<span>
													Location :{shop.location}
												</span>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</>
		</>
	);
};
export default Dashboard;
