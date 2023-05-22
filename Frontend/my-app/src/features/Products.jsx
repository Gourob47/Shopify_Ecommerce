import React, { useEffect, useState } from "react";
import axios from "axios";
import { json, useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  addSize,
  addColor,
  inputSize,
  inputColor,
  addExtra,
  inputExtra,
  addQuantity,
} from "./TestSlice";
const Products = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price,setPrice]=useState("");

  const [cat, setCat] = useState("");

  const [colors, setColors] = useState([{ color: " ", size: "" }]);
  const [quantity, setQuantity] = useState([{ quantity: " " }]);

  const [cnt, setCnt] = useState(0);

  const[uid,setUid]=useState(0);

  const ans = useSelector((state) => state.test.size);
  const ans1 = useSelector((state) => state.test.color);
  const ans2 = useSelector((state) => state.test.inputItems);
  const extra = useSelector((state) => state.test.extraItems);




  const navigate = useNavigate();

  //console.log(ans2);

  const dispatch = useDispatch();

  const addSiz = (e) => {
    e.preventDefault();

    //  {setSizes([...sizes, { size: " ", color:''}])};

    dispatch(addSize());
  };

  const addCol = (e) => {
    e.preventDefault();

    // {setColors([...colors, { color: " ", size:''}])};
    dispatch(addColor());
  };

  const addOption = (e) => {
    e.preventDefault();
    dispatch(addExtra());
  };

  // const addInput = (e) => {
  //   e.preventDefault();

  //   setColors([...colors, { color: " " }]);
  //   setQuantity([...quantity, { quantity: " " }]);

  // };

  const handleSizeChange = (index, value) => {
    //  const newSize = [...sizes];

    // newSize[index][name] = event.target.value;

    //setSizes(newSize);
    // dispatch(addSize());

    dispatch(inputSize({ index, value }));
  };

  const handleColorChange = (index, value) => {
    //  const newColor=[...colors];

    // newColor[index][name] = event.target.value;

    // setColors(newColor);
    //  dispatch(addColor());

    dispatch(inputColor({ index, value }));
  };
  const handleAddOption = (index, value) => {
    dispatch(inputExtra({ index, value }));
  };

  const addQuan = (index, value) => {
    dispatch(addQuantity({ index, value }));
    //console.log(index,value);
  };

  const handleSizeDelete = (e, index, value) => {
    e.preventDefault();

    // console.log(index,value)
  };

  const handleColorDelete = (e, index, value) => {
    e.preventDefault();
    console.log(index, value);
  };

  const handleImageFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const s = JSON.stringify(ans2);


    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("size", s);
    formData.append("price",price);
    

    const response = await axios.post(
      "http://localhost:3333/create/products",
      formData,
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status == 200) {
      alert("Product Created Successfully");
      // navigate("/categoryview");
      setName("");
      setDescription("");
      setImage("");
      setCategory("");
    }
    else
    {
      alert('Products Name Must be Unique')
    }
  }

  const arr=[];

  return (
    <div className="upload-product-container">
      <h1>Create Product</h1>
      <form className="upload-product-form">
        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          id="productName"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Enter product name"
        />
        <label htmlFor="productDescription">Product Description</label>
        <textarea
          id="productDescription"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Enter product description"
        />
      
         {/* <select value={uid} onChange={(e)=> setUid(Number(e.target.value))} >
          {arr.map((number) => (
            <option key={number} value={number}>{number}</option>
          ))}
        </select> */}

        <label htmlFor="productDescription">Category</label>
        <input
          id="productDescription"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          placeholder="Enter product category"
        />


        <label htmlFor="productDescription">Price</label>
        <input
          id="productDescription"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          placeholder="Enter product Price"
        />

        {/* <label htmlFor="productName">Product Category</label>
    
       {cat.length!=0? <select onChange={(e)=>setCategory(e.target.value)}>
       {cat && cat.map((item)=>{
         return(
           <option key={item.id} value={item.type}>
              {item.type}
           </option>
         )
      
       })}
       </select>:""} */}

        <label htmlFor="productImage">Product Image</label>
        <input
          type="file"
          id="productImage"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div>
          <button onClick={addSiz}>Size</button>
          <button onClick={addCol}>Color</button>
          <button onClick={addOption}>Add</button>
        </div>

        <div className="row">
          {ans.length > 0 ? (
            <div className="column">
              {ans &&
                ans.map((input, index) => (
                  <div key={index}>
                    <input
                      placeholder="Size"
                      type="text"
                      value={input.value}
                      onChange={(event) =>
                        handleSizeChange(index, event.target.value)
                      }
                    />
                    {/* <button onClick={(e)=>handleSizeDelete(e,input,index)}>Delete</button> */}
                  </div>
                ))}
            </div>
          ) : (
            ""
          )}

          {ans1.length > 0 ? (
            <div className="column">
              {ans1 &&
                ans1.map((input, index) => (
                  <div key={index}>
                    <input
                      placeholder="Color"
                      type="text"
                      value={input.value}
                      onChange={(event) =>
                        handleColorChange(index, event.target.value)
                      }
                    />
                    {/* <button onClick={(e)=>handleColorDelete(e,input,index)}>Delete</button> */}
                  </div>
                ))}
            </div>
          ) : (
            ""
          )}

          {extra.length > 0 ? (
            <div className="column">
              {extra &&
                extra.map((input, index) => {
                  return (
                    <div key={index}>
                      <input
                        placeholder="Add"
                        type="text"
                        value={input.value}
                        onChange={(event) =>
                          handleAddOption(index, event.target.value)
                        }
                      />
                    </div>
                  );
                })}
            </div>
          ) : (
            ""
          )}
        </div>

        <h4>Variants</h4>

        {ans2 &&
          ans2.map((item, index) => (
            <div key={index}>
              {item.extra || item.size || item.color ? (
                <p>
                  {item.size ? item.size + "/" : ""}
                  {item.color ? item.color + "/" : ""}
                  {item.extra}
                  <input
                    type="text"
                    placeholder="Quantity"
                    onChange={(event) => addQuan(index, event.target.value)}
                  />
                </p>
              ) : (
                ""
              )}
            </div>
          ))}

        <button type="submit" onClick={handleSubmit}>
          Upload
        </button>
        <p>
          <Link to="/categoryview">CategoryView</Link>
        </p>
      </form>
    </div>
  );
};

export default Products;
