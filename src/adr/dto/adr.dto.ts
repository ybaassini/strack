import { StatusEnum } from "../../common/enum";
import { ProjetDto } from "../../projet/dto/projet.dto";
import { ZoneDto } from "../../zone/dto/zone.dto";
import { ApiProperty } from "@nestjs/swagger";
import { PosteDto } from "poste/dto/poste.dto";

export class AdrDto {
  constructor(object: any) {
    const id = object._id.toHexString();
    this.id = id;
    this.date = object.date;
    this.rapporteur = object.rapporteur;
    this.responsable = object.responsable;
    this.status = object.status;
    this.conforme = object.conforme;
    this.commentaire = object.commentaire;
    this.local = object.local;
    this.intitule = object.intitule;
    this.projet = new ProjetDto(object.projet);
    this.zone = new ZoneDto(object.zone);
    this.poste = new PosteDto(object.poste);
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
  readonly conforme: boolean;
  @ApiProperty()
  readonly rapporteur: string;
  @ApiProperty()
  readonly adr: string;
  @ApiProperty()
  readonly local: string;
  @ApiProperty()
  readonly intitule: string;
  @ApiProperty()
  readonly responsable: string;
  @ApiProperty()
  readonly projet: ProjetDto;
  @ApiProperty()
  readonly zone: ZoneDto;
  @ApiProperty()
  readonly poste: PosteDto;
}
