import { ProjetDto } from "../../projet/dto/projet.dto";


export class RiskDto {
  constructor(object: any) {
    this.id = object.id;
    this.label = object.label;
    this.vitale = object.vitale;
    this.projet = new ProjetDto(object.projet);
  };
  readonly id: number;
  readonly label: string;
  readonly projet: ProjetDto;
  readonly vitale: boolean;
}
