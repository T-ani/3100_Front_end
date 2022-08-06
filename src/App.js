import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import SignUp from "./Pages/signUp";
import Update from "./Pages/index";
import SignIn from "./Pages/signIn";
import Home from "./Components/DashBoard/home";
import "./Styles/index.css";
import DashBoard from "./Components/DashBoard/dashboard";
import Search from "./Pages/search";

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
