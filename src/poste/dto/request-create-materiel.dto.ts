import { MaterielDto } from "materiel/dto/materiel.dto";

export class RequestCreateMaterielDto {
    posteId: number;
    materiel: MaterielDto;
}