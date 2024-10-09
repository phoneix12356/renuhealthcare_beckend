import express from "express";
import * as videoRoutes from "../controllers/video.Controler.js"; 

const videoRouter = express.Router();

// Define unique routes for each action
videoRouter.get('/videoGet', videoRoutes.getVideo); // Assuming this fetches video details
videoRouter.post('/videoPost', videoRoutes.videoUpload); // Upload a video
videoRouter.patch('/updateWatchTime', videoRoutes.updateContentWatchTime); // Update watch time (change to PATCH if applicable)
videoRouter.delete('/deleteVideo', videoRoutes.deleteVideos); // Delete a video (change to DELETE if applicable)

export default videoRouter;
