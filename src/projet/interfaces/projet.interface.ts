import { Document } from "mongoose";

export interface Projet extends Document {
  id: string;
  numero: string;
  tranche: string;
}
