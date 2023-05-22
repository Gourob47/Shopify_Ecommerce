import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
const Order = () => {
   
    const [order,setOrder]=useState();
    async function fetchOrder() {
        const response = await axios.get(`http://localhost:3333/orderdetails`, {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
            "Content-Type": "application/json",
          },
        });
        if (response.status == 200) {
          setOrder(response.data);
        }
      }
 
      useEffect(() => {
        fetchOrder();
      }, []);


  return (
     <>
      {order && order.length>0? order.map((item,index)=>{
        return(
            <div className="cart-container" key={index}>
            <div className="cart-item">
              
               <div className="product-details">
                 <h2>product: {item.name}</h2>
                 <p>OrderId: #{item.id}</p>
                 <p>Price: {item.price}</p>
                 <p>Quantity: {item.quantity}</p>
                 <p>Combination: {item.combination}</p>
                 <p>Total: {item.price*item.quantity}</p>
               </div>
            </div>
            <div className="cart-total">
               <p className="checkout-button1"> {item.status}</p>
             </div>
           </div>
        )
      }):<><h1>NO ORDERS YET</h1></>}
     </>
  )
}

export default Order