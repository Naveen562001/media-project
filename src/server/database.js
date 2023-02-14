const mongoose =require('mongoose')
const schema = new mongoose.Schema({
    name:String,
    img:{
        data:Buffer,
        contentType:String
    },
    video:{
        data:Buffer,
        contentType:String

    }

})

module.exports =ImageModel=mongoose.model('imageModel',schema)