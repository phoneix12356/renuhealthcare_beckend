import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true }, 
    post: { type: String, required: true },
    generatedAt: { type: Date, default: Date.now },
    pdfBuffer: { type: Buffer, required: true }
   
});

const Certificate = mongoose.model("Certificate", certificateSchema);


export default Certificate;

// post: { type: String, required: true }