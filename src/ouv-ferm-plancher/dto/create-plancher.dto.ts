import { StatusEnum } from "../../common/enum";
import * as mongoose from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePlancherDto {
  @ApiProperty()
  readonly date: Date;
  @ApiProperty({ enum: StatusEnum, isArray: false })
  readonly status: StatusEnum = StatusEnum.inProgress;
  @ApiProperty()
  readonly commentaire: string;
  @ApiProperty()
  readonly ouverture: boolean;
  @ApiProperty()
  readonly rapporteur: string;
  @ApiProperty()
  readonly responsable: string;
  @ApiProperty()
  readonly projet: string;
  @ApiProperty()
  readonly zone: string;
  @ApiProperty()
  readonly numero: string;
  @ApiProperty()
  readonly conforme: boolean;
}