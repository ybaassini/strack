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
    this.typeRisk = object.typeRisk;
    this.rank = object.rank;
    this.company = object.company;
    this.contact = object.contact;
    this.local = object.local;
    this.site = object.site;
    this.action = object.action;
    this.description = object.description;
    this.picture = object.picture;
    this.projet = object.projet;
    this.faitMarquant = object.faitMarquant;
    this.finished = object.finished;
  }
  readonly id: number;
  readonly date: Date;
  readonly time: Date;
  readonly semaine: number;
  readonly typeRisk: number;
  readonly risk: RiskDto;
  readonly zone: string;
  readonly type: TypeConstatEnum;
  readonly rank: RankConstatEnum;
  readonly company: string;
  readonly contact: string;
  readonly local: string;
  readonly site: string;
  readonly action: string;
  readonly description: string;
  readonly picture: string;
  readonly projet: ProjetDto;
  readonly faitMarquant: boolean;
  readonly finished: boolean;
}

export enum TypeConstatEnum {
  log = "log",
  risk = "risk", // add column note
}

export enum RankConstatEnum {
  positive = "positive",
  negative = "negative", // add column note
}

export enum StatusConstatEnum {
  inProgress = "in progress",
  finished = "finished", // add column note
}
