import React from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { directory, fold } from './TestSlice';
const Pro = () => {
    const navigate=useNavigate();
    const dispatch= useDispatch();
    async function handleCreate(e,key,path){
        e.preventDefault();
        const foldername='newfolder';
        const pa=JSON.stringify(path);
        const item={foldername,key,pa}
        const response= await axios.post('http://localhost:3333/foldercreate',item,{
         withCredentials:true
        })
       
        if(response.status==200)
        {
         navigate(`/folder/${response.data.key}`);
          dispatch(fold(response.data));
        }
       }
  return (
     <div className='btn1'>
       <h5 onClick={(e)=>handleCreate(e,1,[1])}>Create Folder</h5> 
     </div>
  )
}

export default Pro