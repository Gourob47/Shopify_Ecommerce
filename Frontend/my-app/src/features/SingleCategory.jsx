import React from 'react'
import axios from "axios";
import ProductView from './ProductView';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Products from './Products';
const SingleCategory = (props) => {
    const {image_url,category}= props.item;
    const navigate= useNavigate();
    const[ products, setProducts]= useState();
   
   
    async function handleSubmit(e){
        e.preventDefault();
        //fetchProducts();
        navigate(`/productview/${category}`)
        
     
   }


  //  async function fetchProducts() {
  //   const userData={type}
  //   const response = await axios.get(`http://localhost:3333/productviews/${type}`);
  //   setProducts(response.data);
  //   if(response.status==200)
  //   {
  //     navigate(`/productview/${type}`)
  //   }
  
  // }

  return (


   

   <>

    <div>
    <a  onClick={handleSubmit} >
    <div className="card">
      <div className="card-body" >
        <img
          src={`http://localhost:3333/${image_url}`}
          height={200}
          width={200}
          alt=""
        />
        <h4>{category}</h4>
    
      </div>

    </div>
  
    </a>
    </div>

   


  
  
   </>
    


    
  )
}

export default SingleCategory