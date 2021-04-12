import { Document } from "mongoose";
import * as mongoose from 'mongoose';
export interface Materiel extends Document {
  date: Date;
  rapporteur: string;
  responsable: string;
  status: string;
  projet: mongoose.Types.ObjectId;
  zone: mongoose.Types.ObjectId;
  type: string;
  code: string;
  numero: string;
  point: string;
  diagnostic: string;
  actions: string;
  poste: mongoose.Types.ObjectId;
}
