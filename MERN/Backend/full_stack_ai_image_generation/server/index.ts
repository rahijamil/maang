import * as dotenv from 'dotenv';

import connectDB from './mongodb/connect';
import cors from 'cors';
import dalleRoutes from './routes/dalleRoutes';
import express from 'express';
import postRoutes from './routes/postRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!")

})

const startServer = async () => {

  try {
    app.listen(8080, () => {
      console.log("Server has started on port http://localhost:8080")
    });

    connectDB(process.env.MONGODB_URL);
  } catch (error) {
    console.error(error)
  }
}

startServer();