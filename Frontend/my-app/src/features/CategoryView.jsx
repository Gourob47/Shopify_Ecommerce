import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Card from "./SingleProduct";
import { Form, Link, useNavigate } from "react-router-dom";
import SingleCategory from "./SingleCategory";

const CategoryView = () => {
  const [category, setCategory] = useState([]);
  const[type, setType]= useState();
  const navigate= useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("http://localhost:3333/categoryviews");
      const data = await response.json();
      setCategory(data);
    }
    fetchProducts();
  }, []);

  return (
    <>
    <h2>Product Categories</h2>
    <div style={{ display: "flex", flexWrap: "wrap" , margin: "2rem", padding:"2rem"}}>
    
    <br />
    {category &&
      category.map((item, index) => {
        return (
   
            <SingleCategory key={item.id} item={item}/>

        );
      })}
  </div>
    </>
  
  );
};

export default CategoryView;

