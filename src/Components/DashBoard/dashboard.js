import React, { useEffect } from "react";
import { useState } from "react";
import { delStorage, loadStorage } from "../../LocalStorage/localStorage";
import Update from "../../Pages";
import Home from "../../Pages";
import Add_Item from "../../Pages/add_item";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./../../Styles/dashboard_new.scss";
import "./../../Styles/dashBoard.css";
import "./../../Styles/cardDesign.scss";

import PostAddIcon from '@mui/icons-material/PostAdd';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import axios from "axios";
import { red } from "@material-ui/core/colors";

const Dashboard = () => {
	const MAT_URL = "http://localhost:3010/static/";
	const [products, setProducts] = useState([]);
	const [shop, setShop] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const [isPopupOpen, setIsPopupOpen] = useState(false);

	var user = loadStorage("user");
	const navigate = useNavigate();

	useEffect(() => {
		user = loadStorage("user");
		if (!user) {
			setIsLoading(false);
			navigate("/sign-in");
		}
		axios({
			method: "get",
			url: "http://localhost:3010/medicine/getMedicineByShop",
			headers: {
				"Content-Type": "application/json",
				token: localStorage.getItem("token"),
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
			{
				isLoading ? (<div><h1>Loading...</h1></div>) : (<div className='main_page'>
					<div className='dashboard_body'>
						<div className='profile-info'>
							<div className='information'>
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
								<h2>Shop Name : {user.userName}</h2>
								<p> Email : {user.email}</p>
								<text> Content No: {user.phoneNumber}</text>
								<text> Location : {user.location}</text>
								<div className='cutomized-button'>

									<div className='button_1'>
										<button onClick={() => setIsPopupOpen(!isPopupOpen)}><PostAddIcon /></button>
										<label>Add Medicine</label>
									</div>

									<div className='button_1'>
										<button onClick={() => {
											delStorage("user");
											navigate("/sign-in");
										}}><PowerSettingsNewIcon /></button>
										<label>Log Out</label></div>

								</div>
							</div>
						</div>
					</div>



					<div className="product_sec">
						<div className="title-1">
							<h1> Our Products</h1></div>
						<div className="items">
							{products.map((item, key) => {
								return (
									<div
										key={key}
										className="card"
									>
										<img
											className="image-style"
											src={
												MAT_URL + item.image
											}							
										/>
										<div className="product-info">
											<h2>{item.medName}</h2>
											<p>{item.price} BDT</p>
										</div>
										<div className="shop-info">

											<p> {shop.userName}</p>
											<p>  {shop.location}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>)
			}




		</div>
	);
};
export default Dashboard;
