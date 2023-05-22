import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Category = () => {
  const [type, setType] = useState("");

  const [image, setImage] = useState("");

  const handleImageFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("type", type);
    formData.append("image", image);

    const response = await axios.post(
      "http://localhost:3333/create/category",
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
      alert("Category Created Successfully");
      setType("");
      setImage("");
    }
  }

  return (
    <div className="upload-product-container">
      <h1>Create Category</h1>
      <form className="upload-product-form">
        <label htmlFor="productName">Category Type</label>
        <input
          type="text"
          id="productName"
          onChange={(e) => setType(e.target.value)}
          value={type}
          placeholder="Enter product Category"
        />

        <label htmlFor="productImage">Category Image</label>
        <input
          type="file"
          id="productImage"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          value={image.indexOf}
        />

        <button type="submit" onClick={handleSubmit}>
          Upload
        </button>
      </form>
      <p>OR</p>
      <p>
        <Link to="/products">Create Products</Link>
      </p>
    </div>
  );
};

export default Category;
