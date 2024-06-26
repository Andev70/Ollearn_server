import mongoose from "mongoose";
const userTestsResults = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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

const Result =
  mongoose.models.Results || mongoose.model("Results", userTestsResults);
export { Result };
