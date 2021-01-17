import * as mongoose from 'mongoose';

export const ZoneSchema = new mongoose.Schema({
  id: String,
  label: String,
});
