import { Document } from "mongoose";
import * as mongoose from 'mongoose';
export interface Constat extends Document {
  date: Date;
  time: Date;
  semaine: number;
  type: string;
  typeRisk: mongoose.Types.ObjectId;
  rank: string;
  company: string;
  contact: string;
  local: string;
  chantier: string;
  chantierEnjeu: string;
  action: string;
  description: string;
  picture: string;
  projet: string;
  faitMarquant: boolean;
  finished: boolean;
}
