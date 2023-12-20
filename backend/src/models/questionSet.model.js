import mongoose from 'mongoose';
import subject from '../config/subject.js';

const QuestionSetSchema = mongoose.Schema(
  {
    teacher_id: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Please provide teacher_id'],
    },
    question_set_name: {
      type: String,
      required: [true, 'Please provide test name'],
      maxLength: 50,
    },
    subject: {
      type: String,
      enum: Object.values(subject),
      required: [true, 'Please provide subject'],
    },
    description: {
      type: String,
      maxLength: 255,
    },
    question_ids: [mongoose.Types.ObjectId],
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamp: true,
  }
);

const QuestionSet = mongoose.model('QuestionSet', QuestionSetSchema);

export default QuestionSet;
