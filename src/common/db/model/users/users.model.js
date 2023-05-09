import mongoose, { Schema } from "mongoose";

export const UsersSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  occupation: [
    {
      type: String,
      required: true,
    },
  ],
  call: {
    type: Boolean,
    default: true,
  },
  Date: {
    type: Date,
    default: Date(),
  },
  deletedAt: {
    type: Schema.Types.Mixed,
    default: "0",
  },
});

export default mongoose.model("users", UsersSchema);
