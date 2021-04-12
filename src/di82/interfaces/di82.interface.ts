import { Document } from "mongoose";
import * as mongoose from 'mongoose';
export interface Di82 extends Document {
  date: Date;
  rapporteur: string;
  responsable: string;
  status: string;
  projet: mongoose.Types.ObjectId;
  zone: mongoose.Types.ObjectId;
  commentaire: string;
  conforme: boolean;
  numero: string;
  poste: mongoose.Types.ObjectId;
}
