import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadStorage } from "../../LocalStorage/localStorage";
import "../../Styles/index.css";

const Header = () => {
	var user = loadStorage("user");
	const navigate = useNavigate();

	useEffect(() => {
		user = loadStorage("user");
		if (!user) {
			navigate("/");
		}
	}, []);

	return (
		<div>
			<ul className="Header-ui">
				<li>
					<Link to="/" style={{ textDecoration: "none" }}>
						Home
					</Link>
				</li>
				<li>
					<Link to="/sign-up" style={{ textDecoration: "none" }}>
						Sign Up
					</Link>
				</li>

				{!user ? (
					<li>
						<Link to="/sign-in" style={{ textDecoration: "none" }}>
							Log In
						</Link>
					</li>
				) : (
					<li>
						<Link
							to="/dash-board"
							style={{ textDecoration: "none" }}
						>
							Dashboard
						</Link>
					</li>
				)}

				<div></div>
			</ul>
		</div>
	);
};
export default Header;
