import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';

interface IPlan {
  title: string
  description: string
  itinerary: Array<{
    time: Date,
    status: 0 | 1
    title: string
  }>
  tags: String[]
  owner: any
}

const planSchema = new Schema<IPlan>({
  title: { type: String, required: true },
  description: String,
  itinerary: [{
    time: Date,
    status: Number,
    title: String
  }],
  tags: [{type: String}],
  owner: { type: ObjectId, ref: "User", required: true }
});

const Plan = model<IPlan>('Plan', planSchema);

export default Plan