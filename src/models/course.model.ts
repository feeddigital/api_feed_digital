import { Schema, model } from "mongoose";
import { Course } from "../types/Course";

const CourseSchema = new Schema<Course>({
  name: { type: String },
  description: { type: String },
  classroom: { type: String },
  startDate: { 
    date: { type: String },
    description: { type: String },
  },
  endDate: { 
    date: { type: String },
    description: { type: String }
   },
  image: { type: String },
  daysOfClases: { type: [String] },
  hoursOfClases: { type: [String] },
  inscripts:[
    {
      _id: false,
      student: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      pay: { type: Boolean, default: false }
    }
  ],
  active: { type: Boolean },
  price: { type: Number, required: true }
});

export const CourseModel = model("course", CourseSchema);
