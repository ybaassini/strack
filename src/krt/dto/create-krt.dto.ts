import { ApiProperty } from "@nestjs/swagger";

export class CreateKrtDto {
  @ApiProperty()
  readonly poste: string;
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