import { StatusEnum } from '../../common/enum';
import * as mongoose from 'mongoose';

export const AdrSchema = new mongoose.Schema({
  id: String,
  rapporteur: String,
  responsable: String,
  status: {type: String, default: StatusEnum.inProgress},
  commentaire: String,
  conforme: Boolean,
  local: String,
  intitule: String,
  contact: String,
  zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zones' },
  date: {type: Date, default: Date.now},
  projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projets' },
});