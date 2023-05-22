import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
const Register = () => {
   
    const[name,setName]=useState('');
    const[email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [username, setUsername]= useState('');


    const navigate= useNavigate();
    
    async function handleSubmit(e){
        e.preventDefault();
        const item={name, email, password, username};

        const response= await axios.post('http://localhost:3333/register',item,{
            withCredentials:true
        })
        
        if(response.data.user.role=='admin')
        navigate('/products')
         else
         navigate('/categoryview')
        
        
      console.log(response);
    }


  return (
    <div className="register-container">
    <h1>Register</h1>
    <form className="register-form" >
      <label htmlFor="name">Name</label>
      <input type="text" id="name"  value={name} onChange={((e)=>setName(e.target.value))} placeholder="Enter your name" />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email} onChange={((e)=>setEmail(e.target.value))}  placeholder="Enter your email" />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password} onChange={((e)=>setPassword(e.target.value))}  placeholder="Enter your password" />
      <label htmlFor="confirmPassword">User Name</label>
      <input type="password" id="confirmPassword" value={username} onChange={((e)=>setUsername(e.target.value))}  placeholder="User Name" />
      <button type="submit" onClick={handleSubmit}>Register</button>
    </form>
    <p>
      Already have an account? <Link to="/">Login</Link>
    </p>
  </div>
  )
}

export default Register