import tokenTypes from "../config/tokens";
import { Schema, model } from "mongoose";

const tokeSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.ACCESS, tokenTypes.EMAIL_VERIFY],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Token = model("Token", tokeSchema);
export default Token;