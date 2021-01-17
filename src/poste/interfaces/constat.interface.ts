import { Document } from "mongoose";
import { Risk } from "risk/interfaces/risk.interface";

export interface Constat extends Document {
  date: Date;
  time: Date;
  semaine: number;
  risk: Risk;
  type: string;
  typeRisk: number;
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
