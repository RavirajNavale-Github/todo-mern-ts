import { Schema, Document } from "mongoose";
import mongoose from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<User>("User", userSchema);
