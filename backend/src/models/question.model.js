import mongoose from 'mongoose';
import subject from '../config/subject.js';

const questionSchema = mongoose.Schema(
  {
    teacher_id: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Please provide teacher_id'],
    },
    subject: {
      type: String,
      enum: Object.values(subject),
    },
    grade: {
      type: Number,
      required: [true, 'Please provide grade'],
    },
    is_multi_choice: {
      type: Boolean,
      required: [true, 'Please check if multi choice question'],
      default: false,
    },
    content: {
      type: String,
      required: [true, 'Please provide teacher_username'],
      maxLength: 255,
    },
    choices: {
      type: [String],
      required: [true, 'Please provide answer choices'],
    },
    correct_answer: {
      type: [Number],
      required: [true, 'Please provide correct answer'],
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model('Question', questionSchema);

export default Question;
