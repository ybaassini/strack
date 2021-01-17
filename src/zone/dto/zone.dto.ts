import { ApiProperty } from "@nestjs/swagger";
import { ProjetDto } from "../../projet/dto/projet.dto";

export class ZoneDto {
  constructor(object: any) {
    this.id = object._id;
    this.label = object.label;
  };
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly label: string;
}
