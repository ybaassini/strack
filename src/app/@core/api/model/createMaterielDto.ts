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


export interface CreateMaterielDto { 
    date: string;
    status: CreateMaterielDto.StatusEnum;
    description: string;
    rapporteur: string;
    responsable: string;
    projet: string;
    zone: string;
    type: string;
}
export namespace CreateMaterielDto {
    export type StatusEnum = 'in progress' | 'finished';
    export const StatusEnum = {
        InProgress: 'in progress' as StatusEnum,
        Finished: 'finished' as StatusEnum
    };
}
