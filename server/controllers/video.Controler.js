import videoModels from "../models/video.model.js";

export const getVideoById = async (req, res) => {
  try {
    const { vid } = req.params;
    const getVideo = await videoModels.findById(vid);
    if (!getVideo) {
      return res.status(404).send({ message: "Video not found" });
    }
    res.status(200).send({ message: "success", video: getVideo });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const getAllVideo = async (req, res) => {
  try {
    const getVideo = await videoModels.find({});
    res.status(200).send({ message: "success", videos: getVideo });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const videoUpload = async (req, res) => {
  try {
    const createVideohist = new videoModels(req.body);
    const result = await createVideohist.save();
    res.status(201).send({ message: "Video uploaded successfully", video: result });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const updateContentWatchTime = async (req, res) => {
  try {
    const { videoId, content, isComplete } = req.body;
    const watchTimeManage = await videoModels.findById(videoId);
    if (!watchTimeManage) {
      return res.status(404).send({ message: "Video not found" });
    }

    const setTime = (watchTimeManage.watchTime || 0) + 1; // Ensure watchTime exists
    const others = {
      content,
      isCompleted: isComplete,
    };

    const updateWtime = await videoModels.findByIdAndUpdate(
      videoId,
      { watchTime: setTime, ...others },
      { new: true }
    );
    res.status(200).send({ message: "Watch time updated", video: updateWtime });
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
    res.status(200).send({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
