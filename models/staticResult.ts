import mongoose from "mongoose";
const staticResult = new mongoose.Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "McqTest",

      require: true,
    },
    testName: { type: String, required: true },
    answers: [{ type: String }],
  },
  { timestamps: true }
);

const StaticResult =
  mongoose.models.Results || mongoose.model("StaticResult", staticResult);
export { StaticResult };
