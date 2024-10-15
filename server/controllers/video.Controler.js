import videoModels from "../models/video.model.js"
import express from 'express';
const app = express();

export const getVideoById = async (req, res) => {
  try {
    const { vid } = req.params;
    const getVideo = await videoModels.findById(vid);
    if (!getVideo) {
      return res.status(404).send({ message: "Video not found" });
    }
    res.status(200).send({ message: "success", getVideo });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const getAllVideo = async (req, res) => {
  try {
    const getVideo = await videoModels.find({});
    res.status(200).send({ message: "success", getVideo });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const videoUpload = async (req, res) => {
  console.log("video Post");
  try {
    console.log(req.body);
    
    const { videoUrl } = req.body;

    let videoLength;
    try {
      // videoLength = await getVideoDurationInSeconds(videoUrl);
    } catch (durationError) {
      console.error("Error getting video duration:", durationError);
      return res.status(400).send({ message: "Unable to get video duration" });
    }

    const createVideohist = new videoModels({
      ...req.body,
      videoLength,
    });

    const result = await createVideohist.save();
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const updateContentWatchTime = async (req, res) => {
  try {
    const { videoId, content, isComplete } = req.body;
    const video = await videoModels.findById(videoId);
    if (!video) {
      return res.status(404).send({ message: "Video not found" });
    }
    
    let newWatchTime = (video.watchTime || 0) + 1;
    
    const updateData = {
      watchTime: newWatchTime,
      content,
      isCompleted: isComplete,
    };

    const updatedVideo = await videoModels.findByIdAndUpdate(
      videoId,
      updateData,
      { new: true }
    );
    
    res.status(200).send(updatedVideo);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const deleteVideos = async (req, res) => {
  try {
    const { videoId } = req.body;
    const deleteVideo = await videoModels.findByIdAndDelete(videoId);
    if (!deleteVideo) {
      return res.status(404).send({ message: "Video not found" });
    }
    res.status(200).send({ message: "success", deleteVideo });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

