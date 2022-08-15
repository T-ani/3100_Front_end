import React from "react";
import styled from "styled-components";

const MedicineCard = ({ medicine, shop }) => {
	const MAT_URL = "http://localhost:3010/static/";

	return (
		<Card>
			<CardImg>
				<Image src={MAT_URL + medicine.image} alt="Medicine Image" />
			</CardImg>
			<H3>{medicine.medName}</H3>
			<H4>Specs: {medicine.specification}</H4>
			<H4>Price: {medicine.price} BDT</H4>
			<hr />
			<H4>Shop Name: {shop.userName}</H4>
			<H4>Location: {shop.location}</H4>
		</Card>
	);
};

const Card = styled.div`
	display: flex;
	flex-direction: column;
	width: 250px;
	height: 350px;
	margin: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
	background-color: #fff;
	box-shadow: 0px 0px 5px #ccc;
	overflow: hidden;
`;

const CardImg = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const Image = styled.img`
	width: 100px;
	height: auto;
	object-fit: cover;
`;

const H3 = styled.h3`
	font-size: 20px;
	font-weight: bold;
	margin: 10px;
	color: #000;
`;

const H4 = styled.h4`
	font-size: 16px;
	font-weight: bold;
	margin: 10px;
	color: #000;
`;

export default MedicineCard;
