import { Document } from "mongoose";
import { Constat } from "./constat.interface";

export interface Poste extends Document {
  date: Date;
  email: string;
  status: string;
  projet: number;
  zone: number;
  constats: Constat[];
}
