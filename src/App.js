import React, {useState} from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import './App.css'
const {Buffer} = require('buffer')


const App = () => {
 
const [name,setName]  = useState('')
const [file, setFile] = useState(null)
const [file1,setFile1] = useState(null)
const [image,setImage]=useState([]);
const [video,setVideo] = useState([])
const [id,setId]=useState('')
const [search,setSearch] = useState('')
const [deleteStatus,setDeleteSatus] =useState('')
 

  const handleImgName=(e)=>{
      setName(e.target.value);
  }
  //getting file to upload
   const handleImage=(e)=>{
     setFile(e.target.files[0])
     console.log(file);
    
   }

   //video upload
   const handleMedia = (e)=>{
       setFile1(e.target.files[0])
       console.log(file1);
   }
  
 //search by id
 const handleSearch= (e)=>{
  setSearch(e.target.value)
 }

 //posting image in formdata object
 const handleFormSubmit =(e)=>{
   e.preventDefault()
   const formData= new FormData()
   formData.append('name',name)
   formData.append('media',file)
   formData.append('media',file1)
   axios.post('http://localhost:9000',formData).then((res)=>{
     console.log(res.data)})
     .catch((err)=>console.log(err,'not uploaded'))
     
     
    }  
    const handleVideoSearch=async()=>{
      try{
     const videoRes = await axios.get(`http://localhost:9000/media/${search}`)
     setVideo(videoRes.data)
     console.log(video);
      }catch(eror){
        console.log(eror,'video fetch failed');
      }
    }
const handleImageSearch=async()=>{
  try{
    const imageRes = await axios.get(`http://localhost:9000/${search}`)
    setImage(imageRes.data)
    console.log(image);
  }catch(error){
    console.log(error);
  }

}
//getting value of id for delete
const handleIdDelete = (e)=>{
  setId(e.target.value)
  e.preventDefault()
}  


//deleting iamge using id params
const handleDelete=async()=>{
  try{
   const resultd = await axios.delete(`http://localhost:9000/${id}`)
   setDeleteSatus(resultd.data);
  }
  catch(err)
{
  console.log(err,'error in deleting');
}}

  
  //console.log(deleteStatus);

  return (
    <div className='screen'>
      <div id = 'header'>
    <h1>WEB APP TO STORE MEDIA IN MONGODB </h1></div>
    <p id='dlt1'>{deleteStatus}</p>
    <div id = 'form'>
      <form onSubmit = {handleFormSubmit}>
      <input type='text' placeholder='image name' onChange ={handleImgName}></input>
      <input id ='file' type ="file" onChange={handleImage}></input>
      <input id ='media' type= 'file' onChange = {handleMedia} multiple></input>
      <button id ='btn1' type='Submit'>upload</button>
      </form>
    </div>
    <div id ="get-img">
      
      <button onClick={handleImageSearch}>Get Image</button>
    </div>
    <div>
      <input type ="text" placeholder='Enter ID' onChange = {handleSearch}></input>
      <button onClick = {handleVideoSearch}>Get Video</button>
    </div>
    <div id ='delete'>
            <input type ='text' placeholder='Enter-id' onChange={handleIdDelete}></input>
            <button onClick = {handleDelete}>Delete</button>
    </div>
    <div id="img">
  {image && image.data && (
    <img
      src={`data:${image.contentType};base64,${Buffer.from(image.data.data).toString('base64')}`}
      alt="image"
      width="420" height ='340'
    />
  )}
</div>
<div id ='vid'>
  {video && video.data &&(
    
    <video width="420" height="340" controls>
    <source src={`data:${video.contentType};base64,${Buffer.from(video.data.data).toString('base64')}`} type="video/mp4" />
  </video>)
}

</div>


    </div>
  )
   
 
}
export default App