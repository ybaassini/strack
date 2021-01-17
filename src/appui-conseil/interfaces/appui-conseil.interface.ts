import { Document } from "mongoose";
import * as mongoose from 'mongoose';
export interface AppuiConseil extends Document {
  date: Date;
  rapporteur: string;
  responsable: string;
  status: string;
  projet: mongoose.Types.ObjectId;
  zone: mongoose.Types.ObjectId;
  commentaire: string;
  local: string;
  chantier: string;
}
