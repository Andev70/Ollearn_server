import mongoose from "mongoose";

const questionModel = new mongoose.Schema(
  {
    questionNumber: { type: Number, required: true },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "McqTest",
      required: true,
    },
    testName: { type: String, required: true },

    mcq: { type: String, required: true },
    options: [{ type: String, required: true }],
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

const Question =
  mongoose.models?.Questions || mongoose.model("Questions", questionModel);
export default Question;
