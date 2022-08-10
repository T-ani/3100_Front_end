import React, { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import styled from "styled-components";

import "../Styles/medicineCard.css";
import axios from "axios";
import MedicineCard from "../Components/MedicineCard";
import { loadStorage } from "../LocalStorage/localStorage";
import { useNavigate } from "react-router-dom";

const Index = () => {
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
			<Row>
				<SearchInput
					placeholder="Search"
					onChange={(e) => setSearchText(e.target.value)}
				/>
				<Button onClick={handleSearch}>Search</Button>
			</Row>
			<Grid>
				{products.length > 0 ? (
					products.map((item, key) => {
						return (
							<>
								<MedicineCard
									key={key}
									medicine={item}
									shop={shop}
								/>
							</>
						);
					})
				) : (
					<div>
						<h1>No products found</h1>
					</div>
				)}
			</Grid>
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
	padding: 10px;
`;

const Grid = styled.div`
	width: 80%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	grid-gap: 10px;
	margin: 0 auto;
	padding: 10px;
`;

const SearchInput = styled.input`
	width: 40%;
	border-radius: 5px;
	border: 1px solid #ccc;
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
