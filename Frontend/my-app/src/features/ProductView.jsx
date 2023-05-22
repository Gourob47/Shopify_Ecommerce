import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Card from "./SingleProduct";
import { useLocation, useParams } from "react-router-dom";
import SingleProduct from "./SingleProduct";
const ProductView = () => {

   
  const {category}= useParams();


 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(`http://localhost:3333/productviews/${category}`);
      const data = await response.json();
      setProducts(data);
   
   
    }
    fetchProducts();
  }, []);

  return (
    <>
    <h2>Product View</h2>
    <div style={{ display: "flex", flexWrap: "wrap" , margin: "2rem", padding:"2rem"}}>


    
    <br />
    {products &&
      products.map((item, index) => {
        return (
          <SingleProduct key={item.id} item={item}/>
        );
      })}  
  </div>
    </>
  
  );
};

export default ProductView;

