import * as mongoose from 'mongoose';

export const KrtSchema = new mongoose.Schema({
  id: String,
  local: String,
  poste: { type: mongoose.Schema.Types.ObjectId, ref: 'Poste' },
  s1: String,
  s2: String,
  conforme: Boolean,
  affichageINR: String,
  inhibition: Boolean,
});
