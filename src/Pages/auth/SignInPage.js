import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/auth.scss";
import Header from "../../Components/Header/Header";
import { saveStorage } from "../../utils/localStorage";

const SignIn = () => {
	const email_regex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleEnter = (event) => {
		if (event.key.toLowerCase() === "enter") {
			const form = event.target.form;
			const index = [...form].indexOf(event.target);
			form.elements[index + 1].focus();
			event.preventDefault();
		}
	};

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	function handleLogin() {
		if (email === "") {
			toast.error("Email is required");
			return;
		}
		if (!email_regex.test(email)) {
			toast.error("Invalid email");
			return;
		}
		if (phoneNumber === "") {
			toast.error("Phone number is required");
			return;
		}
		if (phoneNumber.length < 11) {
			toast.error("Phone must be at least 11 characters");
			return;
		}
		if (password === "") {
			toast.error("Password is required");
			return;
		}
		if (password.length < 6) {
			toast.error("Password must be at least 6 characters");
			return;
		}

		const data = {
			email: email,
			phoneNumber: phoneNumber,
			password: password,
		};

		console.log(data);
		const response = axios.post("http://localhost:3010/auth/login", data);
		response
			.then((result) => {
				console.log(result.data);
				saveStorage("user", result.data["user"]);
				saveStorage("token", result.data["token"]);

				navigate("/dash-board");
			})
			.catch((error) => {
				console.log("error: ", error);
				toast.error(error.response.data);
			});
	}

	return (
		<div>
			<div className="main_page">
				<Header />
				<div className="sign_in_form">
					<div className="form-signin-card">
						<h2>Log In</h2>
						<input
							onKeyDown={handleEnter}
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter Email"
						/>
						<input
							onKeyDown={handleEnter}
							type="text"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							placeholder="Enter Phone Number"
						/>
						<div className="inputDiv">
							<input
								className="password"
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter Password"
							/>
							<div className="eye">
								<i
									className={
										showPassword
											? "fa fa-eye"
											: "fa fa-eye-slash"
									}
									onClick={togglePassword}
								></i>
							</div>
						</div>
						<button onClick={handleLogin}>Log In</button>
					</div>
				</div>
			</div>
			<ToastContainer autoClose={1500} position="bottom-right" />
		</div>
	);
};
export default SignIn;
