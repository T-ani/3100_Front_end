import React, { useState, Route, Navigate } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveStorage } from "../../LocalStorage/localStorage";
import Header from "../Header/Header";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { composeSyncValidators } from "react-admin";
import "../../Styles/signIn.scss";

const SignInComponent = () => {
	const [error, setError] = useState(null);
	const errorDiv = error ? (
		<div className="error">
			<i class="material-icons error-icon"></i>
			{error}
		</div>
	) : (
		""
	);

	const [values, setValues] = React.useState({
		password: "",
		showPassword: false,
	});

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handlePasswordChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleEnter = (event) => {
		if (event.key.toLowerCase() === "enter") {
			const form = event.target.form;
			const index = [...form].indexOf(event.target);
			form.elements[index + 1].focus();
			event.preventDefault();
		}
	};

	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");

	const email_regex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var str;
	function CollectData_login() {
		if (email === "") {
			setError("Email is required");
			return;
		}
		if (!email_regex.test(email)) {
			setError("Invalid email");
			return;
		}
		if (phoneNumber === "") {
			setError("Phone number is required");
			return;
		}
		if (phoneNumber.length < 11) {
			setError("Phone must be at least 11 characters");
			return;
		}
		if (password === "") {
			setError("Password is required");
			return;
		}
		if (password.length < 6) {
			setError("Password must be at least 6 characters");
			return;
		}
		setError(null);

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
				if (result.status === 200) {
					setError(result.data.message);
					localStorage.setItem("token", result.data.token);
					saveStorage("user", result.data);

					navigate("/dash-board");
					console.log(result.data);
				}
			})
			.catch((error) => {
				console.log("error: ", error);
				setError(error.response.data["msg"]);
			});
	}

	return (
		<div>
			<div className="main_page"> 
			<Header />
			<div className="sign_in_form">
				<div className="form-signin-card">
					{" "}
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
					<input
						
						type={values.showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter Password"
			
							
					/>
					{errorDiv}
					<button
						
						onClick={CollectData_login}
					>
						Log In
					</button>
					<ToastContainer />
				</div>
			</div>

			</div>
					</div>
	);
};
export default SignInComponent;
