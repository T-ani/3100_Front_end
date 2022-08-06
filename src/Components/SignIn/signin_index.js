import React, { useState, Route, Navigate } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveStorage } from "../../LocalStorage/localStorage";
import Header from "../Header/Header";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { composeSyncValidators } from "react-admin";


const SignInComponent = () => {

  const [error, setError] = useState(null)
    const errorDiv = error 
        ? <div className="error">
            <i class="material-icons error-icon"></i>
            {error}
          </div> 
        : '';
  
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
  }


  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("");
  var str;
  function CollectData_login() {

    const data = {
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    };


    console.log(data);
    const response = axios.post("http://localhost:3010/signUp/login", data);
    response.then(result => {
      console.log(result.data)
      if (result.status === 200) { 
        setError(result.data.message);
        localStorage.setItem('token', result.data.token);
        saveStorage("user", result.data);
       
        navigate("/dash-board");
        console.log(result.data);

      }
    })
      .catch(error => {
        console.log('error: ', error);
        //setError(error.response.data);
      });

  }


  return (
    <div >
      <Header />
      <div className="item-align">
       
        <form  > <h1>Log In</h1>
          <Input
         className="inputbox"
          onKeyDown={handleEnter}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
         
        <Input
          className="inputbox"
          onKeyDown={handleEnter}
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter Phone Number"
        />
        <Input
         className="inputbox"
        type={values.showPassword ? "text" : "password"}
        
        value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
        {errorDiv}
        <button className="btn" type="button" onClick={CollectData_login} >
          Log In
        </button>
        <ToastContainer />
        </form>
        
      </div>
    </div>
  );
}
export default SignInComponent;