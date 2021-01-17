import * as mongoose from 'mongoose';
import { PhotoSchema } from 'common/schemas/photo.schema';

export const UserSchema = new mongoose.Schema({
  id: String,
  date: {type: Date, default: Date.now},
  firstName: String,
  lastName: String,
  email: String,
  role: String,
  password: String,
  auth: {
    email : {
      valid : { type: Boolean, default: false }
    }
  },
  settings: {
  }
});