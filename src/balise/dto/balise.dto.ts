import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly poste: PosteDto;
  @ApiProperty()
  readonly label: string;
  @ApiProperty()
  readonly emplacement: string;
  @ApiProperty()
  readonly numero: string;
  @ApiProperty()
  readonly valeurMax: string;
  @ApiProperty()
  readonly releve1: string;
  @ApiProperty()
  readonly releve2: string;
}
