import { model, Schema } from "mongoose";
import { userRoles } from "../constants/userRoles.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: Object.values(userRoles),
      default: userRoles.STARTER,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
  },
  { versionKey: false }
);

export const User = model("user", userSchema);
