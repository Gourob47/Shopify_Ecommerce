import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
const Login = () => {
   
    const [email,setEmail]= useState();
    const [password, setPassword]= useState();

    const navigate= useNavigate();


    async function handleSubmit(e){
        e.preventDefault();
        const data={email, password};

        const response= await axios.post('http://localhost:3333/login',data,{
            withCredentials:true
        })

        if(response.status==200){
          // console.log(response.data)
           if(response.data.user.role=='admin')
            navigate('/products')
           else
             navigate('/categoryview')
        }

    //    console.log(response);
    }

  return (
        <div className="login-container">
          <h1>Login</h1>
          <form className="login-form">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />
            <button type="submit" onClick={handleSubmit}>Login</button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      
  )
}

export default Login