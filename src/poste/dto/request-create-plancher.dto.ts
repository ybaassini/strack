import { PlancherDto } from "ouv-ferm-plancher/dto/plancher.dto";

export class RequestCreatePlancherDto {
    posteId: number;
    plancher: PlancherDto;
}