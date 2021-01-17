import { StatusEnum } from "../../common/enum";
import { ProjetDto } from "../../projet/dto/projet.dto";
import { ZoneDto } from "../../zone/dto/zone.dto";
import { ApiProperty } from "@nestjs/swagger";

export class MaterielDto {
  constructor(object: any) {
    const id = object._id.toHexString();
    this.id = id;
    this.date = object.date;
    this.rapporteur = object.rapporteur;
    this.responsable = object.responsable;
    this.status = object.status;
    this.description = object.description;
    this.type = object.type;
    this.projet = new ProjetDto(object.projet);
    this.zone = new ZoneDto(object.zone);
  }
  @ApiProperty()
  readonly id: number;
  @ApiProperty({ enum: StatusEnum, isArray: false })
  readonly status: StatusEnum;
  @ApiProperty()
  readonly date: Date;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly rapporteur: string;
  @ApiProperty()
  readonly responsable: string;
  @ApiProperty()
  readonly projet: ProjetDto;
  @ApiProperty()
  readonly zone: ZoneDto;
  @ApiProperty()
  readonly type: string;
}
