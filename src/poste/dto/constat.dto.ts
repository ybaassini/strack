import { ApiProperty } from "@nestjs/swagger";
import { TypeConstatEnum, RankEnum } from "../../common/enum";
import { ProjetDto } from "../../projet/dto/projet.dto";
import { RiskDto } from "../../risk/dto/risk.dto";

export class ConstatDto {
  constructor(object) {
    const id = object._id.toHexString();
    this.id = id;
    this.date = object.date;
    this.time = object.time;
    this.semaine = object.semaine;
    this.zone = object.zone;
    this.type = object.type;
    this.typeRisk = object.typeRisk ? new RiskDto(object.typeRisk) : null;
    this.rank = object.rank;
    this.company = object.company;
    this.contact = object.contact;
    this.local = object.local;
    this.chantier = object.chantier;
    this.chantierEnjeu = object.chantierEnjeu;
    this.action = object.action;
    this.description = object.description;
    this.picture = object.picture;
    this.projet = object.projet;
    this.faitMarquant = object.faitMarquant;
    this.finished = object.finished;
  }
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly date: Date;
  @ApiProperty()
  readonly time: Date;
  @ApiProperty()
  readonly semaine: number;
  @ApiProperty()
  readonly typeRisk: RiskDto | null;
  @ApiProperty()
  readonly zone: string;
  @ApiProperty({ enum: TypeConstatEnum, isArray: false })
  readonly type: TypeConstatEnum;
  @ApiProperty({ enum: RankEnum, isArray: false })
  readonly rank: RankEnum;
  @ApiProperty()
  readonly company: string;
  @ApiProperty()
  readonly contact: string;
  @ApiProperty()
  readonly local: string;
  @ApiProperty()
  readonly chantier: string;
  @ApiProperty()
  readonly chantierEnjeu: string;
  @ApiProperty()
  readonly action: string;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly picture: string;
  @ApiProperty()
  readonly projet: ProjetDto;
  @ApiProperty()
  readonly faitMarquant: boolean;
  @ApiProperty()
  readonly finished: boolean;
}


