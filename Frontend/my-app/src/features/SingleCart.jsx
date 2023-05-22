import React from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { cart, editCart } from './TestSlice';
const SingleCart = (props) => {
  

   const {name, price, quantity,combination,id,uniqueid}=props.item;

   const dispatch= useDispatch();
    async function confirm(e,total){
        e.preventDefault();
        const userData={name,price,quantity, combination, id,uniqueid,total}
        const response = await axios.post(
            `http://localhost:3333/order`,
            userData,
            {
              withCredentials: true,
              headers: {
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json",
              },
            }
          );
          if(response.status==200)
          {
            dispatch(editCart(id));
            alert('Product Checkout Complete');
          }
    }

    async function deleteCart(e,id){
        e.preventDefault();
        const userData={id};
        const response = await axios.post(
            `http://localhost:3333/deletecart`,
            userData,
            {
              withCredentials: true,
              headers: {
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json",
              },
            }
          );
          if(response.status==200)
          {
            dispatch(editCart(id));
            alert('Product Discarded');
          }
    }


  
  return (

  <div className="cart-container">
    <div className="cart-item">
      
       <div className="product-details">
         <h2>{name}</h2>
         <p>Price: {price}</p>
         <p>Quantity: {quantity}</p>
         <p>Combination: {combination}</p>
         <p>Total: {price*quantity}</p>
       </div>
    </div>
    <div className="cart-total">
      {/* <h3>Cart Total: $129.97</h3> */}
       <button className="checkout-button" onClick={(e)=>confirm(e,price*quantity)}>Proceed to Checkout</button>
       <button className="checkout-button" onClick={(e)=>deleteCart(e,id)}>Delete</button>
     </div>
   </div>
  

  )
}

export default SingleCart