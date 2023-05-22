import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Modal from 'react-modal';
import SingleFolder from './SingleFolder';
import { useDispatch, useSelector } from 'react-redux';
import { directory, fold, foldersFile } from './TestSlice';
const Folder = () => {

  const {id}= useParams();
  const [folder,setFolder]=useState([]);
  const [f,setF]=useState([]);
  const [image,setImage]=useState();

  const data= useSelector((state)=>state.test.folders);
  const path=useSelector((state)=>state.test.path);
  const file= useSelector((state)=>state.test.files);



  const navigate= useNavigate();
  const dispatch= useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  async function handleCreate(e,key,path){
   e.preventDefault();
   navigate(`/folder/${key}`);
   dispatch(directory(key));
   const foldername='newfolder';
   const pa=JSON.stringify(path);
   const item={foldername,key,pa}
   const response= await axios.post('http://localhost:3333/foldercreate',item,{
    withCredentials:true
   })
   if(response.status==200)
   {

    dispatch(fold(response.data)); 
   }
  }


  async function handleCreateFile(e,id){
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append('id',id);
    const response= await axios.post('http://localhost:3333/filecreate',formData,{
        withCredentials:true
    })
 
    if(response.status==200)
    {  
      dispatch(foldersFile(response.data));     
    }
  }

  async function getFile(id){
    const response= await axios.get(`http://localhost:3333/getfile/${id}`,{
        withCredentials:true
    })
    if(response.status==200)
    {
      
      dispatch(foldersFile(response.data));
    }
  }


  async function handleGet(item){
     navigate(`/folder/${item}`);
    
    const response1= await axios.get(`http://localhost:3333/getall/${item}`)
    if(response1.status==200)
    {
      
      dispatch(directory(item));
      dispatch(fold(response1.data));
      getFile(item);
      
    }
  }


  useEffect(()=>{
  handleGet(id);
 },[])


  return (
    <>

    <div style={{display:'flex',justifyContent:'center'}}>

    <h1>PATH</h1>
    {path  && path.map((item,index)=>{
     return(
      <div key={index}>
      <div className='btn'  onClick={(e)=>handleGet(item)}>
         <h5 >{item}</h5>
     
      </div>

      </div>
   
     )}
    )}

    <div className='btn1'>
    {path.length==0? <h5 onClick={(e)=>handleCreate(e,1,1)}>Create Folder</h5> 
    :
    <h5 onClick={(e)=>handleCreate(e,path[path.length-1],path)}>Create Folder</h5>}
    </div>
    </div> 
    
    <div className="upload-product-container">
    <form className="upload-product-form">
    <label htmlFor="productImage">Files</label>
        <input
          type="file"
          id="productImage"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
       <button type='submit' onClick={(e)=>handleCreateFile(e,id)}>Upload File</button> 
    </form>
    </div>
     {data.length>0 && data.map((item,index)=>{
        if(item.id!=item.key){
        return(
          <div key={index}>  
            <div>          
              <button onClick={(e)=>handleGet(item.id)}> {item.foldername}</button>
               <SingleFolder item={item}/>   
           </div>                 
        </div>
        )}
     }) }
     <div style={{display:'flex',padding:'10px'}}>
     {file && file.map((item,index)=>{
       return(
        <div key={index} style={{padding:'10px'}}>
            <img
                src={`http://localhost:3333/${item.filename}`}
                height={200}
                width={200}
                alt=""
              />
              <p>{item.filename}</p>
        </div>
       )
     })}
     </div> 
    </>
)
}

export default Folder