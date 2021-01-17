import * as mongoose from 'mongoose';

export interface Zone extends mongoose.Document {
  label: string;
  projet: mongoose.Types.ObjectId;
}
