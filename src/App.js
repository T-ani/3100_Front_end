import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Update from "./Pages/index";
import Home from "./Components/DashBoard/home";
import "./Styles/index.css";
import DashBoard from "./Components/DashBoard/dashboard";
import Search from "./Pages/search";
import SignUp from "./Pages/auth/signUp";
import SignIn from "./Pages/auth/signIn";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Update />}></Route>
					<Route path="/sign-up" element={<SignUp />}></Route>
					<Route path="/sign-in" element={<SignIn />}></Route>
					<Route path="/dash-board" element={<DashBoard />}></Route>
					<Route path="/home" element={<Search />}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
