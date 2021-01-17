import { StatusEnum } from "../../common/enum";
import * as mongoose from "mongoose";
import { ConstatDto } from "./constat.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePosteDto {
  @ApiProperty()
  readonly date: Date;
  @ApiProperty({ enum: StatusEnum, isArray: false })
  readonly status: StatusEnum = StatusEnum.inProgress;
  @ApiProperty()
  readonly label: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly projet: string;
  @ApiProperty()
  readonly zone: string;
  @ApiProperty()
  readonly constats: ConstatDto[];
}