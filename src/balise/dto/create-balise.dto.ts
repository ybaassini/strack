import { PosteDto } from "poste/dto/poste.dto";

export class CreateBaliseDto {
  readonly poste: string;
  readonly label: string;
  readonly emplacement: string;
  readonly numero: string;
  readonly valeurMax: string;
  readonly releve1: string;
  readonly releve2: string;
}