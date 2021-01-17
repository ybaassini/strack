import * as mongoose from 'mongoose';

export const ProjetSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  numero: String,
  tranche: String,
});
