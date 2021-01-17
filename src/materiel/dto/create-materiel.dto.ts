import { StatusEnum } from "../../common/enum";
import * as mongoose from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMaterielDto {
  @ApiProperty()
  readonly date: Date;
  @ApiProperty({ enum: StatusEnum, isArray: false })
  readonly status: StatusEnum = StatusEnum.inProgress;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly rapporteur: string;
  @ApiProperty()
  readonly responsable: string;
  @ApiProperty()
  readonly projet: string;
  @ApiProperty()
  readonly zone: string;
  @ApiProperty()
  readonly type: string;
}