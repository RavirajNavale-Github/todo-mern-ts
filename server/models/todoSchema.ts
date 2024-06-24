import { Schema, Document } from "mongoose";
import mongoose from "mongoose";

export interface Todo extends Document {
  title: string;
  description: string;
}

const todoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, requiredd: true },
});

export default mongoose.model<Todo>("Todo", todoSchema);
