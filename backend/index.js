import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// Routes
import diaryRouter from "./routes/diary.js";


dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// To make the code more readable, we will use `router` to handle each resource.
app.use("/api/diary", diaryRouter);

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // We move app.listen() here to make sure that the server is started after the connection to the database is established.
    app.listen(port, () =>
      console.log(`Server running on port http://localhost:${port}`),
    );
    // If the connection is successful, we will see this message in the console.
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    // Catch any errors that occurred while starting the server
    console.log(error.message);
  });
