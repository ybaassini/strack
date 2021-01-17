import { ProjetDto } from "../../projet/dto/projet.dto";

export class ZoneDto {
  constructor(object: any) {
    this.id = object.id;
    this.label = object.label;
    this.projet = new ProjetDto(object.projet);
  };
  readonly id: number;
  readonly label: string;
  readonly projet: ProjetDto;
}
