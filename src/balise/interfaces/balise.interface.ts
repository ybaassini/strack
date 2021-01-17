import { Document } from "mongoose";
import { PosteDto } from "poste/dto/poste.dto";

export interface Balise extends Document {
  label: string;
  poste: PosteDto;
  emplacement: string;
  numero: string;
  valeurMax: string;
  releve1: string;
  releve2: string;
}
