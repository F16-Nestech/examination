import mongoose from 'mongoose';
import tokenTypes from '../config/token.js';

const tokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
  },
  expires: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: [tokenTypes.ACCESS, tokenTypes.REFRESH],
  },
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;
