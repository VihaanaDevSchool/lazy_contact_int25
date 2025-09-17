import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  phone: string;
  email: string;
  notes?: string;
}

const contactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  notes: { type: String },
});

export default mongoose.model<IContact>("Contact", contactSchema);
