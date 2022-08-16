import React from "react";

import "../../Styles/footer.scss";
import VaccinesIcon from '@mui/icons-material/Vaccines';

const Footer = () => {
  return (
    <div className="footer">
     
     <div className="icon">
			<div><VaccinesIcon style={{ fontSize: 80 , margin: 10}}/></div>
			<div><p style={{ fontSize: 30 , margin: 10}}>  MedSearch </p></div>
			
			
		</div>
     <div><p style={{ fontSize: 20 , margin: 10, color: "white"}}> A website for searching medicine</p></div>
    </div>
  );
};

export default Footer;
