import { ApiProperty } from "@nestjs/swagger";


export class RiskDto {
  constructor(object: any) {
    this.id = object._id;
    this.label = object.label;
    this.vitale = object.vitale;
  };
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly label: string;
  @ApiProperty()
  readonly vitale: boolean;
}
