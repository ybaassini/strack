import { Document } from "mongoose";
import * as mongoose from 'mongoose';
export interface Consigne extends Document {
  date: Date;
  rapporteur: string;
  responsable: string;
  status: string;
  projet: mongoose.Types.ObjectId;
  zone: mongoose.Types.ObjectId;
  description: string;
  poste: mongoose.Types.ObjectId;
}
