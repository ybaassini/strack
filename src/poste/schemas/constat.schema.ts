import * as mongoose from 'mongoose';
import { RiskSchema } from '../../risk/schemas/risk.schema';

export const ConstatSchema = new mongoose.Schema({
  id: String,
  semaine: Number,
  time: Date,
  // risk: String,
  typeRisk: Number,
  risk: RiskSchema,
  date: {type: Date, default: Date.now},
  // zone: String,
  zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone' },
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