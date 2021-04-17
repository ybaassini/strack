import { ConsigneDto } from "consigne/dto/consigne.dto";

export class RequestCreateConsigneDto {
    posteId: number;
    consigne: ConsigneDto;
}