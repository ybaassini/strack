import { ApiProperty } from "@nestjs/swagger";

export class CreateBaliseDto {
  @ApiProperty()
  readonly poste: string;
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