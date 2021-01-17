import * as mongoose from 'mongoose';

export const ConstatSchema = new mongoose.Schema({
  id: String,
  semaine: Number,
  time: Date,
  typeRisk: { type: mongoose.Schema.Types.ObjectId, ref: 'risques' },
  date: {type: Date, default: Date.now},
  type: String,
  rank: String,
  company: String,
  contact: String,
  local: String,
  chantier: String,
  chantierEnjeu: String,
  action: String,
  description: String,
  picture: String,
  projet: String,
  faitMarquant: Boolean,
  finished: Boolean,
});