import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Styles/index.css";
import DashBoard from "./Pages/dashboard/DashboardPage";
import Search from "./Pages/search/SearchPage";
import SignUp from "./Pages/auth/SignUpPage";
import SignIn from "./Pages/auth/SignInPage";
import Index from "./Pages/index/IndexPage";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Index />}></Route>
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
