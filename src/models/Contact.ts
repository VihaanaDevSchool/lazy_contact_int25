import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  phone: string;
  email: string;
  job: string;
  address?: string;
  notes?: string;
  user: string; // ← add this
}

const contactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  job: { type: String },
  address: { type: String },
  notes: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ← add this
});

export default mongoose.model<IContact>("Contact", contactSchema);
