import React from 'react'
import { useState } from 'react';

const Video = () => {

const[file,setFile]= useState(null);

const handleVideoFile =(e)=>{
  setFile(e.target.files[0])
  console.log(file);
}

  return (
    <div>video
        <input type= 'file' onChange={handleVideoFile}></input>
    </div>
  )
}

export default Video