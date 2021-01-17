import { ApiProperty } from "@nestjs/swagger";
export class CreateZoneDto {
  @ApiProperty()
  readonly label: string;
}