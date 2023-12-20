import mongoose from 'mongoose';
import subject from '../config/subject.js';

const questionWithOrderSchema = mongoose.Schema({
  question_id: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Please provide question_id'],
  },
  order: {
    type: [Number],
    default: [0, 1, 2, 3],
  },
  point: {
    type: Number,
    required: [true, 'Please provide point for the question'],
  },
});

const testSchema = mongoose.Schema(
  {
    teacher_id: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Please provide teacher_id'],
    },
    test_name: {
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
      maxLength: 120,
    },
    status: {
      type: [String],
      enum: ['draft', 'published', 'doing', 'done', 'deleted'],
      default: 'draft',
    },
    test_time_minutes: {
      type: Number,
      required: [true, 'Please provide test_time_minutes'],
    },
    test_start_time: {
      type: Date,
    },
    max_point: {
      type: Number,
      default: 10,
    },
    questions: [questionWithOrderSchema],
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model('Test', testSchema);

export default Test;
