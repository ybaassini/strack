import * as Mongoose from "mongoose";

export class ProjetDto {
  constructor(object: any) {
    const id = object._id.toHexString();
    this.id = id;
    this.numero = object.numero;
    this.tranche = object.tranche;
  };
  readonly id: number;
  readonly numero: number;
  readonly tranche: string;
}
