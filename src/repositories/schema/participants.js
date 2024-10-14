import mongoose from "mongoose";
import { PARTICIPANTS_ROLE } from "../../constant.js";

const participantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: PARTICIPANTS_ROLE,
    },
  },
  { timestamps: true }
);

const Participant = mongoose.model("Participant", participantSchema);
export default Participant;
