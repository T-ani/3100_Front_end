import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import styled from "styled-components";
import "../../Styles/cardDesign.scss";
import "../../Styles/cardDesignHome.scss";
import axios from "axios";
import Footer from "../../Components/Footer/Footer";

const Index = () => {
	const MAT_URL = "http://localhost:3010/static/";
	const [searchText, setSearchText] = useState("");
	const [products, setProducts] = useState([]);
	const [shop, setShop] = useState(null);

	const handleSearch = () => {
		setProducts([]);
		console.log(searchText);

		const data = {
			searchText: searchText,
		};

		axios
			.post("http://localhost:3010/medicine/searchMedicineForUser/", data)
			.then((result) => {
				if (result.status === 200) {
					console.log(result.data);
					setProducts(result.data.result["medicine"]);
					setShop(result.data.result["shop"]);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			<Header />
			<div className="search-design"><Row>
				<SearchInput
					placeholder="Search"
					onChange={(e) => setSearchText(e.target.value)}
				/>
				<Button onClick={handleSearch}>Search</Button>
			</Row></div>
			

			{products.length > 0 ? (
				<div className="product_sec-home">
					<div className="title-1-home">
						<h1>Search Result(s)</h1>
					</div>
					<div className="items-home">
						{products.map((item, key) => {
							return (
								<div key={key} className="card-home">
									<img
										className="image-style-home"
										src={MAT_URL + item.image}
									/>
									<div className="product-info-home">
										<h2>{item.medName}</h2>
										<p>{item.price} BDT</p>
									</div>
									<div className="shop-info-home">
										<p> {item.shop.userName}</p>
										<p> {item.shop.location}</p>
									</div>
									
								</div>
							);
						})}
					</div>
				</div>
			) : (
				
				<div className="gap">
					
					<div className="about-home">
						<p>Activities of MedSearch</p>
						<div className="about-us">
							
							<text> Your searched medicines will be appered here with shop name. </text>
							<text>You will be able to find out the shop in which your needed medicines are available</text>
						
						</div>
						<div className="last-text">
							<text>Enjoy to use this website for your convenient</text>
						</div>
						

					</div>
				</div>
			
				
				
			)}

			<Footer/>
		</div>
	);
};

const Row = styled.div`
	width: 80%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	justify-items: center;
`;

const SearchInput = styled.input`
	width: 40%;
	border-radius: 5px;
	borde:none;
	padding: 10px;
	font-size: 16px;
	margin-right: 10px;
`;

const Button = styled.button`
	border-radius: 5px;
	border: 1px solid #ccc;
	padding: 10px;
	background-color: brown;
	color: white;
	font-size: 16px;
	font-weight: bold;
`;

export default Index;
