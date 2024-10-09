import moduleModel from "../models/module.model.js";

export const getModules = async (req, res) => {
  try {
    const { videoId } = req.body;
    const getVideo = await moduleModel.findById(videoId);
    res.status(200).send(getVideo);
  } catch (err) {
    res.status(402).send({ message: err.message });
  }
};

export const addModule = async (req, res) => {
  const { title, testid, videoUrl } = req.body;
  try {
    const modules = new moduleModel({
      title,
      videoId: videoUrl,
      test: testid,
    });
    const result = await modules.save();
    res.status(200).send(result);
  } catch (err) {
    res.status(402).send({ message: err.message });
  }
  //add videoUrl to video table
  // all data to module table
  //send response
};

export const deleteModule = async (req, res) => {
  try {
    const { videoId } = req.body;
    const deleteVideo = await moduleModel.findByIdAndDelete(videoId);
    res.status(200).send({message : deleteVideo});
  } catch (err) {
    res.status(402).send({ message: err.message });
  }
};

export const updateModule = async (req, res) => {
  try {
    const { title, videoId, test, moduleid } = req.body;
    const updateContent = {
      title,
      videoId,
      test,
    };
    const updateModule = await moduleModel.findByIdAndUpdate(
      moduleid,
      updateContent,
      { new: true }
    );
    if (!updateModule) {
      res.status(404).send({ message: "No content found" });
    } else {
      res.status(200).send({ message: "updateModule" });
    }
  } catch (err) {
    res.status(402).send({ message: err.message });
  }
};
