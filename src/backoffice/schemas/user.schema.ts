import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    index: {
      unique: true,
    },
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});
