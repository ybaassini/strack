import { StatusEnum } from '../../common/enum';
import * as mongoose from 'mongoose';
import { ConstatSchema } from './constat.schema';

export const PosteSchema = new mongoose.Schema({
  id: String,
  email: String,
  status: {type: String, default: StatusEnum.inProgress},
  label: String,
  zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zones' },
  date: {type: Date, default: Date.now},
  projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projets' },
  constats: [ConstatSchema],
});