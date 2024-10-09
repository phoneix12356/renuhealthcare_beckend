import videoModels from "../models/video.model.js";


export const getVideo = async (req, res) => {
    try {
       
        const { videoId } = req.body;  // Consistent naming
        const getVideo = await videoModels.findById(videoId);
        res.status(200).send({ message: "success", getVideo });
    } catch (err) {
        res.status(400).send({ message: err.message });  // Sending a message object
    }
}




export const videoUpload = async (req, res) => {
    try {
        const { content } = req.body;  // Corrected isComplate to isComplete
        const createVideohist = new videoModels({
            content
        });
        const result = await createVideohist.save();  // Await the save operation
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ message: err.message });  // Sending a message object
    }
}




export const updateContentWatchTime = async (req, res) => {
    try {
        const { videoId, content, isComplete } = req.body;  // Consistent naming
        const watchTimeManage = await videoModels.findById(videoId);  // Use findById instead of find
        if (!watchTimeManage) {
            return res.status(404).send({ message: "Video not found" });
        }
        let setTime = (watchTimeManage.watchTime || 0) + 1;  // Ensure watchTime exists
        const others = {
            content,
            isCompleted: isComplete
        };
        const updateWtime = await videoModels.findByIdAndUpdate(videoId, { watchTime: setTime, ...others }, { new: true });
        res.status(200).send(updateWtime);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}



export const deleteVideos = async (req, res) => {
    try {
        const { videoId } = req.body;  // Consistent naming
        const deleteVideo = await videoModels.findByIdAndDelete(videoId);
        if (!deleteVideo) {
            return res.status(404).send({ message: "Video not found" });
        }
        res.status(200).send({ message: "success", deleteVideo });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}





