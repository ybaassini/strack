import { StatusEnum } from "../../common/enum";
import * as mongoose from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdrDto {
  @ApiProperty()
  readonly date: Date;
  @ApiProperty({ enum: StatusEnum, isArray: false })
  readonly status: StatusEnum = StatusEnum.inProgress;
  @ApiProperty()
  readonly commentaire: string;
  @ApiProperty()
  readonly rapporteur: string;
  @ApiProperty()
  readonly responsable: string;
  @ApiProperty()
  readonly projet: string;
  @ApiProperty()
  readonly zone: string;
  @ApiProperty()
  readonly conforme: boolean;
  @ApiProperty()
  readonly intitule: string;
  @ApiProperty()
  readonly local: string;
  @ApiProperty()
  readonly contact: string;
  @ApiProperty()
  readonly poste: string;
}