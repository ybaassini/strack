import { Document } from "mongoose";
import { Constat } from "./constat.interface";
import * as mongoose from 'mongoose';
export interface Poste extends Document {
  date: Date;
  email: string;
  status: string;
  projet: mongoose.Types.ObjectId;
  zone: mongoose.Types.ObjectId;
  constats: Constat[];
}
