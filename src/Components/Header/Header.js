import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadStorage } from "../../LocalStorage/localStorage";
import "../../Styles/index.css";
import "../../Styles/navbar.scss";

const Header = () => {
	var user = loadStorage("user");

	useEffect(() => {
		user = loadStorage("user");
	}, []);

	return (
		<div className="navbar">
			<div className="link">
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
								Log In
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

				<div></div>
			</div>
		</div>
	);
};
export default Header;
