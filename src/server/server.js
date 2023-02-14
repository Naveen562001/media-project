const express = require('express')
const app = express()

const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const imageModel = require('./database')
const fs =require('fs')
const cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({extented:false}))
app.use(bodyParser.json())


const storage = multer.memoryStorage();
const upload = multer({ storage });

mongoose.connect("mongodb://localhost/imageuploaddb",{useNewurlParser:true, useUnifiedTopology:true})
.then(()=>console.log('db is connected'))
.catch((err)=>console.log(err,'err plesae chk'))



// app.get('/',(req,res)=>{
    
//     res.send("upload file")
// })



//const upload = multer({storage:storage,limits:{filesize:10000000}})

//post
app.post('/',upload.array('media',2),async(req,res)=>{
    try{
    const saveImage =new imageModel({
        name:req.body.name,
        img:{
            data:req.files[0].buffer,
            contentType:"image/png"
        },
        video:{
            data:req.files[1].buffer,
            contentType:"video/mp4"

            }
    })
    await saveImage.save()
    res.send('media saved');
}
    
    catch(err){console.log(err,'media cant save');
}
    
})
app.get('/media/:id',async(req,res)=>{
    try{
    const videoData = await imageModel.findOne({name:req.params.id})
    res.contentType('video/mp4');
    res.send(videoData.video)
}catch(err){
    res.status(500).json({message:err.message})
}

})

app.get('/:id',async(req,res)=>{
    try{
    const imageData = await imageModel.findOne({name:req.params.id});
    res.contentType('image/png');
    res.send(imageData.img)
    }catch(error){
        res.send('image not found')
    }

})
app.delete('/:id',async(req,res)=>{
   const deleteImage = await imageModel.deleteOne({name:req.params.id})
  res.send('image deleted')
})




app.listen(9000,()=>{
    console.log("server running");
})