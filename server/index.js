// index.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDb from "./config/connectdb.js";
import routes from "./routes/index.js";
dotenv.config();

const app = express();

app.use((req, res, next) => {
  console.log("new request", req.body);
  next();
});

connectDb()
  .then(() => {
    // Start the server after successful connection
    app.listen(port, () => {
      console.log(`Server listening at localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1); // Exit the process with a non-zero exit code
  }); // Call the connectDb function

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load Routes
app.use("/api", routes);

//MONGODB_URI=mongodb+srv://anshul:anshul112@clusterdatabase.24furrx.mongodb.net/renuapp?retryWrites=true&w=majority&appName=ClusterDatabase
