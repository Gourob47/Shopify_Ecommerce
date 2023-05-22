import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import SingleCart from "./SingleCart";
import { useDispatch, useSelector } from "react-redux";
import { userCart } from "./TestSlice";
import { Link } from "react-router-dom";
const Cart = () => {
  //const [cart, setCart] = useState();

   const cart=useSelector((state)=>state.test.cart)

  const dispatch= useDispatch();

  async function fetchCart() {
    const response = await axios.get(`http://localhost:3333/cart`, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
    });
    if (response.status == 200) {
      dispatch(userCart(response.data));
     
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

 

  return (
    <>
      <div style={{display:'flex', justifyContent:'center'}}>

        <div style={{padding:'10px 10px'}}>
        <p>
      <Link to="/cart">MY CART({cart.length})</Link>
     
      </p>
        </div>
      
     <div style={{padding:'10px 10px'}}>
     <p>
      <Link to="/order">MY ORDERS</Link>
      </p>
     </div>
      </div>
      {cart.length>0?cart.map((item) => {
          return (
            <div key={item.id}>
              <SingleCart item={item} />
            </div>
          );
        }):<><h1>YOUR CART IS EMPTY</h1></>
        
        
        
        }
    </>

  );
};

export default Cart;
