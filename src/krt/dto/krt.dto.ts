import { ApiProperty } from "@nestjs/swagger";
import { PosteDto } from "poste/dto/poste.dto";

export class KrtDto {
  constructor(object: any) {
    this.id = object.id;
    this.local = object.label;
    this.s1 = object.s1;
    this.s2 = object.s2;
    this.conforme = object.conforme;
    this.affichageINR = object.affichageINR;
    this.inhibition = object.inhibition;
    this.poste = new PosteDto(object.poste);
  };
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly poste: PosteDto;
  @ApiProperty()
  readonly local: string;
  @ApiProperty()
  readonly s1: string;
  @ApiProperty()
  readonly s2: string;
  @ApiProperty()
  readonly conforme: boolean;
  @ApiProperty()
  readonly affichageINR: string;
  @ApiProperty()
  readonly inhibition: boolean;
}
