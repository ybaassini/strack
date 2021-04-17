import * as mongoose from 'mongoose';

export const BaliseSchema = new mongoose.Schema({
  id: String,
  label: String,
  emplacement: String,
  numero: String,
  valeurMax: String,
  releve1: String,
  releve2: String,
});
