<img  className="img_sty" src={item.link} width="50" 
           height="50"/>
           <div key={key}  className="medicine_card" >{item.productName}
        
        </div>

<div >{
    product.map((item,key)=>
    {
      return (
      <div key={key}  className="medicine_card" >{item.productName}
      <img  className="img_sty" src={item.link} width="50" 
         height="50"/>
      </div>
      )
    })
  }
  </div>
      

      display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    background-color: red;

    height: 603px;
  width: 30%;
  background-color:rebeccapurple;
  float: right;
  justify-content: center;
  display: flex;
  flex-direction: column;


  height: 60%;  
  background-color:rebeccapurple;
  float: right;
  justify-content: center;
  display: flex;
  flex-direction: column;

  <input className="input_box"></input>
  <input className="input_box_1"></input>
  <input className="input_box_1"></input>
  <input className="input_box_1"></input>
  <input className="input_box_1"></input>
  <input className="input_box_1"></input>

  .input_box{
    width: 70%;
    height: 10%;
    margin: 20px;
    border-radius: 6px;
    border: gainsboro;
  }
  .input_box_1{
    width: 70%;
    height: 10%;
    
    margin-top: 0px;
    margin-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 6px;
    border: gainsboro;
    
  }