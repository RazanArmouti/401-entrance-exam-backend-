'use strict';
const {watchModel} = require('../models/watch.model');
const axios = require('axios');

const getAllAPIController= async (req,res)=>{
    await axios.get(`${process.env.THIRD_PARTY_API}`).then(result=>{
        res.status(200).json(result.data);
    });
}

const getAllController= async (req,res)=>{
    await watchModel.find({}).then(data=>{
        res.status(200).json(data);
    });
}

const createController= async (req,res)=>{
    let watchData= req.body;
    let newWatch= new watchModel(watchData);
    newWatch.save();
    await watchModel.find({}).then(data=>{
        res.status(200).json(data);
    });
}

const updateController =async (req,res)=>{
    let watchId= req.params.id;
    let updatedData=req.body;
    watchModel.findone({_id:watchId}).then(watchData=>{
        watchData.id=updatedData.id;
        watchData.title=updatedData.title;
        watchData.description=updatedData.description;
        watchData.toUSD=updatedData.toUSD;
        watchData.image_url=updatedData.image_url;
        watchData.email=updatedData.email;
        watchData.save();
    })
    let watchList= await watchModel.find({});
    res.status(200).json(watchList);
}

const deleteController= async (req,res)=>{
    let watchId= req.params.id;
    watchModel.findByIDAndDelete(watchId,(err=>{
        if(err){
            res.status(500).json("error ocured during delete");
        }else {
            resolve(`Deleted watch ${watchId} successfully`);
          }
    }))
    let watchsList=await watchModel.find({});
    res.status(200).json(watchsList);
}

module.exports={
    getAllAPIController,
    getAllController,
    createController,
    updateController,
    deleteController

}