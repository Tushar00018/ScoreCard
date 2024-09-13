import express from "express";
import cors from "cors";
import "dotenv/config";
import ScoreCard from "./model.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/data", async (req, res) => {
  try {
    const data = await ScoreCard.find();
    res.json(data);
  } catch (error) {
    console.error("There was an error fetching the data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/data", async (req, res) => {
  const newData = new ScoreCard(req.body);
  await newData
    .save()
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
  res.send("Database Updated");
});

app.delete("/data/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ScoreCard.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).send("Document not found");
    }
    res.send("Deleted successfully");
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).send("Error deleting document");
  }
});

app.listen(6060, () => {
  console.log("Listening on port 6060");
});
