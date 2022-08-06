import React from "react";
import Header from "../Components/Header/Header";
import "../Styles/search.css"

const Search = () => {
  return (
    <>
    <Header/>
     <div >
        <div className="left-float">
            <h1>MED-SEARCH</h1> 
            <p>Search Rare Medicines</p>
            <br/>
           
            <div className="field_se">
            
                        <label style={{margintop:"20px"}}>Medicine Name</label>
                    <input type='text' className="input_se"  />
                    </div>
                    <div className="field_se">
            
            <label style={{margintop:"20px"}}>Location</label>
        <input type='text' className="input_se"  />
        </div>
        <button className="button_se">GO</button>
            
        </div>
        <div className="right-float"></div>


     </div>
    </>
  );
};
export default Search;
