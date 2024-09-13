import mongoose from "mongoose";
import "dotenv/config";

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
main()
  .then(() => console.log("Connected to DB Succesfully"))
  .catch((err) => console.log(err));

const scoreSchemas = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
    min: 0,
  },
});

const ScoreCard = mongoose.model("ScoreCard", scoreSchemas);

export default ScoreCard;
