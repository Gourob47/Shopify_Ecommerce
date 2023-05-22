
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { product, products } from './TestSlice';

const SingleProduct = (props) => {
    const {id,image_url,name, description,uniqueid,variant,price}= props.item;

   

   
   

    const navigate= useNavigate();
    
    const {category}= useParams();
   
    const dispatch=useDispatch();

  async function handleSubmit(e){
    e.preventDefault();
  
    navigate(`/productview/${category}/${id}`)
  }




  return (
        
  <>
    <a onClick={handleSubmit}>
      <div className="card">
          <div className="card-body">
            <img
              src={`http://localhost:3333/${image_url}`}
              height={200}
              width={200}
              alt=""
            />
            <h3>{name}</h3>
            <p>{description}</p>
            <p>Price: {price}</p>
            <div style={{display:'flex', justifyContent:'center'}}>
            {variant.map((item,index)=>{
              return(
                
                 <div key={index} >
                    <button onClick={(e)=>e.preventDefault()}>{item.value}</button>
                 </div>         
             
              )
            })}
            </div>
      
          </div> 
        </div>
      </a>
  </>


  );
};

export default SingleProduct;