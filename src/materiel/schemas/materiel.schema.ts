import { StatusEnum } from '../../common/enum';
import * as mongoose from 'mongoose';

export const MaterielSchema = new mongoose.Schema({
  id: String,
  rapporteur: String,
  responsable: String,
  status: {type: String, default: StatusEnum.inProgress},
  type: String,
  code: String,
  numero: String,
  point: String,
  diagnostic: String,
  actions: String,
  zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zones' },
  date: {type: Date, default: Date.now},
  projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projets' },
});