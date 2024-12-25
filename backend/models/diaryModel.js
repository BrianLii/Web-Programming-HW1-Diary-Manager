import mongoose from "mongoose";

const diarySchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    tag: {
      type: String,
      enum: ['學業', '人際', '社團']
    },
    mood: {
      type: String,
      enum: ['快樂', '生氣', '難過'],
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    }
  },
);

const DiaryModel = mongoose.model("Diary", diarySchema);
export default DiaryModel;