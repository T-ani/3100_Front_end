import React, { useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import PhoneInput from "react-phone-number-input";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";

const SignUpComponent = () => {
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
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
 
  const [password, setPassword] = useState("");
 
  function collectData() {
    const data = {
      userName: name,
      email: email,
      phoneNumber: phoneNumber,
      location: location,
      password: password,
    };


    console.log(data);
    let response = axios.post("http://localhost:3010/signUp/register", data);

    console.log(response);
   response.then(result=>{
    if (result.status === 200) {
      console.log(result.data.message);
      setError(result.data.message);
    }
   }).catch(error=>{
    setError(error.response.data);
   });

  }

  return (
    <div>
         <Header/>
    <div className="item-align">
      
      <form>
      <h1>Register</h1>
         <Input
        value={name}
        className="inputbox_1"
        onKeyDown={handleEnter}
        name="name"
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Shop Name"
      />
      <Input
        value={email}
        className="inputbox_1"
        onKeyDown={handleEnter}
        name="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
     
      <Input
        value={phoneNumber}
        className="inputbox_1"
        onKeyDown={handleEnter}
        type="phone" id="phone" name="phone"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter Phone Number"
      />
      <Input
      value={location}
     className="inputbox_1"
        onKeyDown={handleEnter}
        onChange={(e) => setLocation(e.target.value)}

        placeholder="Enter Location"
      />
      
      <Input
        value={password}
        className="inputbox_1"
        onKeyDown={handleEnter}
        name="password"
        type={values.showPassword ? "text" : "password"}
        
       
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
      <button className="btn" type="button" onClick={collectData}>
        Sign Up
      </button>
      </form>
     
    </div>
    </div>
  );
};
export default SignUpComponent;
