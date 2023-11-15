import mongoose from 'mongoose';

const questionSchema = mongoose.Schema(
  {
    teacher_id: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Please provide teacher_id'],
    },
    subject: {
      type: String,
      enum: [
        'maths',
        'physics',
        'chemistry',
        'biology',
        'english',
        'literature',
        'history',
        'geography',
        'it',
        'natural science',
        'social science',
        'other',
      ],
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
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model('Question', questionSchema);

export default Question;
