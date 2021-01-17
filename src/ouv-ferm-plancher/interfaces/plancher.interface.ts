import { Document } from "mongoose";
import * as mongoose from 'mongoose';
export interface Plancher extends Document {
  date: Date;
  rapporteur: string;
  responsable: string;
  status: string;
  projet: mongoose.Types.ObjectId;
  zone: mongoose.Types.ObjectId;
  commentaire: string;
  conforme: boolean;
  ouverture: boolean;
  numero: string;
}
