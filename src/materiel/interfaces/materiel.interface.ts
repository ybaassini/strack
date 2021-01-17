import { Document } from "mongoose";
import * as mongoose from 'mongoose';
export interface Materiel extends Document {
  date: Date;
  rapporteur: string;
  responsable: string;
  status: string;
  projet: mongoose.Types.ObjectId;
  zone: mongoose.Types.ObjectId;
  description: string;
  type: string;
}
