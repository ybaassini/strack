import { ApiProperty } from "@nestjs/swagger";

export class CreateProjetDto {
  @ApiProperty()
  readonly numero: string;
  @ApiProperty()
  readonly tranche: string;
}