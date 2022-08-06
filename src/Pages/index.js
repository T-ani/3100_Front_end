import React from "react";
import Header from "../Components/Header/Header";
import "../Styles/medicineCard.css"

const Update = () => {

  const product = [
    {
      link: "https://www.iddo.org/sites/default/files/styles/slideshow/public/slideshow/2018-04/pexels-photo-415825_blue%20white%20pills.jpg?h=c5515ee6&itok=-tfLiODB",
      productName: "productName_1",
      productPrice: "10",
      shopName:"ABCDE",
      location:"221/b, Baker Street"

    },
    {
      link: "https://www.iddo.org/sites/default/files/styles/slideshow/public/slideshow/2018-04/pexels-photo-415825_blue%20white%20pills.jpg?h=c5515ee6&itok=-tfLiODB",
      productName: "productName_1",
      productPrice: "10",
      shopName:"ABCDE",
      location:"221/b, Baker Street"

    }, {
      link: "https://www.iddo.org/sites/default/files/styles/slideshow/public/slideshow/2018-04/pexels-photo-415825_blue%20white%20pills.jpg?h=c5515ee6&itok=-tfLiODB",
      productName: "productName_1",
      productPrice: "10",
      shopName:"ABCDE",
      location:"221/b, Baker Street"

    },
  ]


  return (

    <div>
      <Header />
      <div className="card-holder">

        <div class="row">{
          product.map((item, key) => {
            return (
              <div key={key} className="medicine_card" >
                <div ><div className="card-img">
                  <img className="img_sty" src={item.link} width="30"
                  height="30" />
                </div>
                <div><div className="medicine-details">
                  <h3>{item.productName}</h3>
                  <p>{item.productPrice}</p>
                                   
                </div >
                <div className="medicine-details-1">
                  <br></br>
                  <label>Shop name : {item.shopName}</label>
                  
                  <label>Location :{item.location}</label>
                  </div></div>
</div>
                
                 
                
                
                

              </div>
            )
          })
          
        }
        
        </div>
       

      </div>
    </div>);

};
export default Update;
