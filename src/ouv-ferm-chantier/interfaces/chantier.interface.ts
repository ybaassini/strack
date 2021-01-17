import { Document } from "mongoose";
import * as mongoose from 'mongoose';
export interface Chantier extends Document {
  date: Date;
  rapporteur: string;
  responsable: string;
  status: string;
  projet: mongoose.Types.ObjectId;
  zone: mongoose.Types.ObjectId;
  commentaire: string;
  conforme: boolean;
  ouverture: boolean;
  local: string;
  chantier: string;
  contact: string;
  numero: string;
}
