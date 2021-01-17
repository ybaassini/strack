import { ApiProperty } from "@nestjs/swagger";

export class ProjetDto {
  constructor(object: any) {
    this.id = object._id;
    this.numero = object.numero;
    this.tranche = object.tranche;
  };
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly numero: number;
  @ApiProperty()
  readonly tranche: string;
}
