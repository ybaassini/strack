import { ChantierDto } from "ouv-ferm-chantier/dto/chantier.dto";

export class RequestCreateChantierDto {
    posteId: number;
    chantier: ChantierDto;
}