import { ApiProperty } from "@nestjs/swagger";

export class CreateRiskDto {
  @ApiProperty()
  readonly label: string;
  @ApiProperty()
  readonly vitale: boolean;
}