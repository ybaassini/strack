
import * as mongoose from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { StatusMateriel } from "common/data/materiel.data";

export class CreateMaterielDto {
  @ApiProperty()
  readonly date: Date;
  @ApiProperty({ enum: StatusMateriel, isArray: false })
  readonly status: StatusMateriel;
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
  @ApiProperty()
  readonly poste: string;
  @ApiProperty()
  readonly actions: string;
  @ApiProperty()
  readonly diagnostic: string;
  @ApiProperty()
  readonly code: string;
  @ApiProperty()
  readonly numero: string;
  @ApiProperty()
  readonly point: string;
}