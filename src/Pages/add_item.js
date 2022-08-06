import React, { useState } from "react";
import "../Styles/profile.css"


const Add_Item = () => {

  const [medName, setMedname] = useState("")
  const [company, setCompany] = useState("")
  const [specification, setSpecification] = useState("")
  const [price, setPrice] = useState("")

  const axios = require('axios');

  function c_d() {
    var data = {

      medName: medName,
      company: company,
      specification: specification,
      price: price
    };

    console.log(data);  }

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }
  const [img, setImg] = useState();

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };
  const product = [
    {
      link: "https://www.iddo.org/sites/default/files/styles/slideshow/public/slideshow/2018-04/pexels-photo-415825_blue%20white%20pills.jpg?h=c5515ee6&itok=-tfLiODB",
      productName: "productName_1",
      productPrice: "10",

    },]





  return (
    <div className="form_add_item">

      <form  ><h1>Upload a Medicine</h1>
        <input
          className="inputbox" placeholder="Medicine-Name"
          onKeyDown={handleEnter}
          value={medName}
          onChange={(e) => setMedname(e.target.value)}
        ></input>

        <input className="inputbox" placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          onKeyDown={handleEnter}></input>

        <input className="inputbox" value={specification}
          onChange={(e) => setSpecification(e.target.value)}
          placeholder="Specification" onKeyDown={handleEnter}>
        </input>

        <input className="inputbox" placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)} onKeyDown={handleEnter}>
      
          </input>

        <div className="pic">
          <img src={img} alt="" width="80" height="80" />
          <input type="file" onChange={onImageChange} className="pic_u" />
        </div>
        <button className="btn" onClick={c_d}>Save</button>
      </form>




    </div>
  );

};
export default Add_Item;
