import React from "react";
import { useState } from "react";
import { delStorage, loadStorage } from "../../LocalStorage/localStorage";
import Update from "../../Pages";
import Home from "../../Pages";
import Add_Item from "../../Pages/add_item";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const Dashboard = () => {

    const navigate = useNavigate();
    const[show,setShow]= useState(true);
    const[show_1,setShow_1]= useState(true);

    const user = loadStorage("user");

   
       



    return (

        <div>
            <Header/>
            
            <div class="container">
               {show && <div class="row">
                    <div className="upload"><Add_Item/></div>
                </div> }
                
                
                <div class="row"><div className="per-info">
                    <div className="card-profile">
                    <div className="field_1">
            
                        <label style={{margintop:"20px"}}>Shop Name</label>
                    <input type='text' className="input_n"  placeholder={user.userName} readOnly= {true} />
                    </div>
                    <div className="field">
                        <label >Email</label>
                        <input type='text' className="input_n"  placeholder={user.email} readOnly= {true}/>
                    </div>
                    
                    <div className="field">
                        <label >Phone Number</label>
                        <input type='text' className="input_n"  placeholder={user.phoneNumber} readOnly= {true}/>
                    </div>
                    <br></br>
                    
                    <button onClick={ () => setShow(!show ) } className="button">Add Item </button>
                    <button  className="button">All items</button>
                    <button  className="button" onClick={()=> {
                        delStorage("user");
                        navigate("/sign-in");
                    }}>Log Out</button>
                    
                       
                    </div>                   
                </div>  </div>
            </div>
                
                    
        </div>
        
         
       
    );
};
export default Dashboard;