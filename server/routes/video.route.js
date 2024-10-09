import express from "express";
import * as videoRoutes from "../controllers/video.Controler.js"; 

const videoRouter = express.Router();

// Define unique routes for each action
videoRouter.get('/videoGet', videoRoutes.getVideo); 
videoRouter.post('/videoPost', videoRoutes.videoUpload); 
videoRouter.patch('/updateWatchTime', videoRoutes.updateContentWatchTime); 
videoRouter.delete('/deleteVideo', videoRoutes.deleteVideos); 

export default videoRouter;
