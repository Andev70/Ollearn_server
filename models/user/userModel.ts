import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },

    password: { type: String, required: true },

    email: { type: String, required: true },
    isOnline: { type: Boolean, default: false },
    socketId: { type: String, default: "2aa0f741-5cf7-4e09-9e5b-3c912f16a8b0" },
    isGivingTest: { type: Boolean, default: false },
    takenTests: { type: mongoose.Schema.Types.ObjectId, ref: "McqTest" },
    classMates: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dimondStatus: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Student =
  mongoose.models.User || mongoose.model("User", userSchema);
