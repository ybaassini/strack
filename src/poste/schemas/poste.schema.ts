import * as mongoose from 'mongoose';
import { StatusConstatEnum } from '../../poste/dto/constat.dto';
import { ConstatSchema } from './constat.schema';

export const PosteSchema = new mongoose.Schema({
  id: String,
  email: String,
  status: {type: String, default: StatusConstatEnum.inProgress},
  label: String,
  zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone' },
  // zone: String,
  date: {type: Date, default: Date.now},
  projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projet' },
  // projet: String,
  constats: [ConstatSchema],
});