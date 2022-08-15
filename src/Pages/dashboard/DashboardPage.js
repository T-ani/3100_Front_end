import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { delStorage, loadStorage } from "../../utils/localStorage";
import Add_Item from "../../Components/AddItemPopUp/add_item";
import Header from "../../Components/Header/Header";
import "./../../Styles/dashboard_new.scss";
import "./../../Styles/cardDesign.scss";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const Dashboard = () => {
	const MAT_URL = "http://localhost:3010/static/";
	const [products, setProducts] = useState([]);
	const [shop, setShop] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const [isPopupOpen, setIsPopupOpen] = useState(false);

	var user = loadStorage("user");
	var token = loadStorage("token");
	const navigate = useNavigate();

	useEffect(() => {
		user = loadStorage("user");
		token = loadStorage("token");

		if (!user) {
			setIsLoading(false);
			navigate("/sign-in");
		}
		console.log(user);
		console.log(token);
		axios({
			method: "get",
			url: "http://localhost:3010/medicine/getMedicineByShop",
			headers: {
				"Content-Type": "application/json",
				token: token,
			},
		})
			.then((result) => {
				console.log(result.data);
				setProducts(result.data.result["medicine"]);
				setShop(result.data.result["shop"]);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
				// setError(error.response.data);
			});
	}, [isPopupOpen]);

	return (
		<div>
			<Header />
			{isLoading ? (
				<div>
					<h1>Loading...</h1>
				</div>
			) : (
				<div className="main_page">
					<div className="dashboard_body">
						<div className="profile-info">
							<div className="information">
								{isPopupOpen && (
									<div class="popup">
										<div className="upload">
											<Add_Item
												isPopupOpen={isPopupOpen}
												setIsPopupOpen={setIsPopupOpen}
												toast={toast}
											/>
										</div>
									</div>
								)}
								<h2>Shop Name : {user.userName}</h2>
								<p> Email : {user.email}</p>
								<text> Content No: {user.phoneNumber}</text>
								<text> Location : {user.location}</text>
								<div className="cutomized-button">
									<div className="button_1">
										<button
											onClick={() =>
												setIsPopupOpen(!isPopupOpen)
											}
										>
											<PostAddIcon />
										</button>
										<label>Add Medicine</label>
									</div>

									<div className="button_1">
										<button
											onClick={() => {
												delStorage("user");
												navigate("/sign-in");
											}}
										>
											<PowerSettingsNewIcon />
										</button>
										<label>Log Out</label>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="product_sec">
						<div className="title-1">
							<h1> Our Products</h1>
						</div>
						<div className="items">
							{products.map((item, key) => {
								return (
									<div key={key} className="card">
										<img
											className="image-style"
											src={MAT_URL + item.image}
										/>
										<div className="product-info">
											<h2>{item.medName}</h2>
											<p>{item.price} BDT</p>
										</div>
										<div className="shop-info">
											<p> {item.shop.userName}</p>
											<p> {item.shop.location}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}
			<ToastContainer autoClose={1500} position="bottom-right" />
		</div>
	);
};

export default Dashboard;
