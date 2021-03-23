/**
 * EPR api
 * The list of EPR project endpoints
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ProjetDto } from '././projetDto';
import { ZoneDto } from '././zoneDto';


export interface MaterielDto { 
    id: number;
    status: MaterielDto.StatusEnum;
    date: string;
    description: string;
    rapporteur: string;
    responsable: string;
    projet: ProjetDto;
    zone: ZoneDto;
    type: string;
}
export namespace MaterielDto {
    export type StatusEnum = 'in progress' | 'finished';
    export const StatusEnum = {
        InProgress: 'in progress' as StatusEnum,
        Finished: 'finished' as StatusEnum
    };
}