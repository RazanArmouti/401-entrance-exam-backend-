'use strict';
const mongoose=require('mongoose');

const watchSchema= new mongoose.Schema({
    id:Number,
    title:String,
    description:String,
    toUSD:String,
    image_url:String,
    email:String
});

const watchModel= mongoose.model('watch',watchSchema);

module.exports={
    watchModel 
}