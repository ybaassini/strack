import { StatusEnum } from "../../common/enum";
import { ProjetDto } from "../../projet/dto/projet.dto";
import { ZoneDto } from "../../zone/dto/zone.dto";
import { ApiProperty } from "@nestjs/swagger";
import { PosteDto } from "poste/dto/poste.dto";

export class ChantierDto {
  constructor(object: any) {
    const id = object._id.toHexString();
    this.id = id;
    this.date = object.date;
    this.rapporteur = object.rapporteur;
    this.responsable = object.responsable;
    this.ouverture = object.ouverture;
    this.status = object.status;
    this.conforme = object.conforme;
    this.commentaire = object.commentaire;
    this.local = object.local;
    this.chantier = object.chantier;
    this.contact = object.contact;
    this.numero = object.numero;
  }
  @ApiProperty()
  readonly id: number;
  @ApiProperty({ enum: StatusEnum, isArray: false })
  readonly status: StatusEnum;
  @ApiProperty()
  readonly date: Date;
  @ApiProperty()
  readonly commentaire: string;
  @ApiProperty()
  readonly numero: string;
  @ApiProperty()
  readonly conforme: boolean;
  @ApiProperty()
  readonly rapporteur: string;
  @ApiProperty()
  readonly chantier: string;
  @ApiProperty()
  readonly local: string;
  @ApiProperty()
  readonly contact: string;
  @ApiProperty()
  readonly responsable: string;
  @ApiProperty()
  readonly ouverture: boolean;

}
