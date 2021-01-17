import * as mongoose from 'mongoose';

export const RiskSchema = new mongoose.Schema({
  id: String,
  label: String,
  vitale: Boolean
});
