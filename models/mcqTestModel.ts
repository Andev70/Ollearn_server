import mongoose from "mongoose";

const mcqTestSchema = new mongoose.Schema(
  {
    completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Students" }],
    class: { type: String, required: true },
    subject: { type: String, required: true },
    testId: { type: String, required: true, unique: true },
    testName: { type: String, required: true, unique: true },
    duration: { type: String, default: 180 },
    questionCount: { type: Number, required: true, default: 50 },

    takenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Students" }],
    premium: { type: Boolean, default: false },
  },

  { timestamps: true }
);
const Test =
  mongoose.models.MsqTest || mongoose.model("McqTest", mcqTestSchema);
export default Test;
