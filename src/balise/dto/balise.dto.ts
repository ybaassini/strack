import { PosteDto } from "poste/dto/poste.dto";

export class BaliseDto {
  constructor(object: any) {
    this.id = object.id;
    this.label = object.label;
    this.emplacement = object.emplacement;
    this.numero = object.numero;
    this.valeurMax = object.valeurMax;
    this.releve1 = object.releve1;
    this.releve2 = object.releve2;
    this.poste = new PosteDto(object.poste);
  };
  readonly id: number;
  readonly poste: PosteDto;
  readonly label: string;
  readonly emplacement: string;
  readonly numero: string;
  readonly valeurMax: string;
  readonly releve1: string;
  readonly releve2: string;
}
