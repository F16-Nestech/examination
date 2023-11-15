import mongoose from 'mongoose';

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
      required: [true, 'Please provide subject'],
    },
    description: {
      type: String,
      maxLength: 255,
    },
    questions: [mongoose.Types.ObjectId],
  },
  {
    timestamp: true,
  }
);

const QuestionSet = mongoose.model('QuestionSet', QuestionSetSchema);

export default QuestionSet;
