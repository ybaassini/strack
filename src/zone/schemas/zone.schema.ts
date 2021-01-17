import * as mongoose from 'mongoose';

export const ZoneSchema = new mongoose.Schema({
  id: String,
  label: String,
  projet: { type:  mongoose.Schema.Types.ObjectId , ref: 'ProjetSchema'},
});
