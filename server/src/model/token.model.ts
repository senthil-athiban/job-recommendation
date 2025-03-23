import tokenTypes from "../config/tokens";
import { Schema, model } from "mongoose";

const tokenSchema = new Schema(
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
      index: true,
    },
    expires: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

tokenSchema.index({user: 1, type: 1});

const Token = model("Token", tokenSchema);
export default Token;