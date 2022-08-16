import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { loadStorage } from "../../utils/localStorage";
import "../../Styles/index.css";
import "../../Styles/navbar.scss";
import VaccinesIcon from '@mui/icons-material/Vaccines';

const Header = () => {
	var user = loadStorage("user");

	useEffect(() => {
		user = loadStorage("user");
	}, []);

	return (
		<div className="navbar">
		<div className="icon">
			<div><VaccinesIcon style={{ fontSize: 40 , margin: 10}}/></div>
			<div><p style={{ fontSize: 20 , margin: 10}}>  MedSearch </p></div>
		
		
		</div>
		<div className="link-container">	<div className="link">
				<a>
					<Link to="/" style={{ textDecoration: "none" }}>
						Home
					</Link>
				</a>

				{!user ? (
					<>
						<a>
							<Link
								to="/sign-up"
								style={{ textDecoration: "none" }}
							>
								Sign Up
							</Link>
						</a>
						<a>
							<Link
								to="/sign-in"
								style={{ textDecoration: "none" }}
							>
								Login
							</Link>
						</a>
					</>
				) : (
					<a>
						<Link
							to="/dash-board"
							style={{ textDecoration: "none" }}
						>
							Dashboard
						</Link>
					</a>
				)}

			</div></div>
		
		</div>
	);
};
export default Header;
