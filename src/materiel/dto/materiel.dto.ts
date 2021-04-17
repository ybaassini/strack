import { StatusEnum } from "../../common/enum";
import { ProjetDto } from "../../projet/dto/projet.dto";
import { ZoneDto } from "../../zone/dto/zone.dto";
import { ApiProperty } from "@nestjs/swagger";
import { PosteDto } from "poste/dto/poste.dto";
import { StatusMateriel } from "common/data/materiel.data";

export class MaterielDto {
  constructor(object: any) {
    const id = object._id.toHexString();
    this.id = id;
    this.date = object.date;
    this.rapporteur = object.rapporteur;
    this.responsable = object.responsable;
    this.status = object.status;
    this.diagnostic = object.diagnostic;
    this.type = object.type;
    this.code = object.code;
    this.numero = object.numero;
    this.point = object.point;
    this.actions = object.actions;
  }
  @ApiProperty()
  readonly id: number;
  @ApiProperty({ enum: StatusMateriel, isArray: false })
  readonly status: StatusMateriel;
  @ApiProperty()
  readonly date: Date;
  @ApiProperty()
  readonly rapporteur: string;
  @ApiProperty()
  readonly responsable: string;
  @ApiProperty()
  readonly type: string;
  @ApiProperty()
  readonly diagnostic: string;
  @ApiProperty()
  readonly actions: string;
  @ApiProperty()
  readonly code: string;
  @ApiProperty()
  readonly numero: string;
  @ApiProperty()
  readonly point: string;

}
