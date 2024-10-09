const moduleModel = require('../models/module.model');


const  getModules = async(req, res)=> {
  try{
    const {videoId} = req.body;
    const getVideo = await moduleModel.findById(videoId)
    res.send(getVideo).status(200)
  }
  catch(err){
    res.send({message: err.message}).status(402)
  }
}

const addModel = async(req, res) =>{
  const { title, testid, videoUrl } = req.body;
  try{
    const modules = new moduleModel({
      title,
      videoId : videoUrl,
      test : testid
    })
    const result = await modules.save();
    res.send(result).status(200)
  }
  catch(err){
    res.send({message: err.message}).status(402)
  }
  //add videoUrl to video table
  // all data to module table
  //send response
}

const deleteModule = async(req, res)=> {
  try{
    const {videoId} = req.body;
    const deleteVideo = await moduleModel.findByIdAndDelete(videoId)
    res.send(deleteVideo).status(200)
  }
  catch(err){
    res.send({message: err.message}).status(402)
  }
}

const updateModule = async (req, res)=> {
  try{
    const {title, videoId, test, moduleid} = req.body
    const updateContent = {
        title,
        videoId, 
        test
    }
    const updateModule = await moduleModel.findByIdAndUpdate(moduleid, updateContent, {new : true})
    if(!updateModule){
      res.send({message: 'not Found Any Content'})
    }else{
      res.send({message: updateModule}).status(200)
    }
  }
  catch(err){
    res.send(err.message).status(402)
  }
}



module.exports = {addModel, getModules, deleteModule, updateModule}
