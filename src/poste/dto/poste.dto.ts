import { ProjetDto } from "../../projet/dto/projet.dto";
import { ZoneDto } from "../../zone/dto/zone.dto";
import { ConstatDto, StatusConstatEnum } from "./constat.dto";

export class PosteDto {
  constructor(object: any) {
    const id = object._id.toHexString();
    this.id = id;
    this.date = object.date;
    this.email = object.email;
    this.status = object.status;
    this.label = object.label;
    this.projet = new ProjetDto(object.projet);
    this.zone = new ZoneDto(object.zone);
    // this.projet = object.projet;
    // this.zone = object.zone;
    this.constats = object.constats.map(constat => new ConstatDto(constat));
  }
  readonly id: number;
  readonly status: StatusConstatEnum;
  readonly date: Date;
  readonly label: string;
  readonly email: string;
  readonly projet: ProjetDto;
  // readonly projet: string;
  readonly zone: ZoneDto;
  // readonly zone: string;
  readonly constats: ConstatDto[];
}
