import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/auth.scss";
import Header from "../../Components/Header/Header";

const SignUp = () => {
	const email_regex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [location, setLocation] = useState("");
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

	function handleSignUp() {
		if (name === "") {
			toast.error("Name is required");
			return;
		}
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
		if (location === "") {
			toast.error("Location is required");
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
			userName: name,
			email: email,
			phoneNumber: phoneNumber,
			location: location,
			password: password,
		};

		console.log(data);
		let response = axios.post("http://localhost:3010/auth/signup", data);

		console.log(response);
		response
			.then((result) => {
				if (result.status === 200) {
					console.log(result.data.message);

					navigate("/sign-in");
				}
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
						<h2>Register</h2>
						<input
							value={name}
							onKeyDown={handleEnter}
							name="name"
							type="text"
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter Shop Name"
						/>
						<input
							value={email}
							onKeyDown={handleEnter}
							name="email"
							type="email"
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter Email"
						/>
						<input
							value={phoneNumber}
							onKeyDown={handleEnter}
							type="phone"
							id="phone"
							name="phone"
							pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
							onChange={(e) => setPhoneNumber(e.target.value)}
							placeholder="Enter Phone Number"
						/>
						<input
							value={location}
							onKeyDown={handleEnter}
							onChange={(e) => setLocation(e.target.value)}
							placeholder="Enter Location"
						/>
						<div className="inputDiv">
							<input
								value={password}
								onKeyDown={handleEnter}
								name="password"
								type={showPassword ? "text" : "password"}
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
						<button onClick={handleSignUp}>Sign Up</button>
					</div>
				</div>
			</div>
			<ToastContainer autoClose={1500} position="bottom-right" />
		</div>
	);
};
export default SignUp;
