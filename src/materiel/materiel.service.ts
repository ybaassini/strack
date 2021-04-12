import { Model, Mongoose } from "mongoose";
import { Injectable } from "@nestjs/common";
import { CreateMaterielDto } from "./dto/create-materiel.dto";
import { InjectModel } from "@nestjs/mongoose";
import * as _ from "lodash";
import { Materiel } from "./interfaces/materiel.interface";
import { MaterielDto } from "./dto/materiel.dto";
import { isTypedArray } from "lodash";
import { MATERIELS } from "common/data/materiel.data";

const saltRounds = 10;

@Injectable()
export class MaterielService {
  constructor(
    @InjectModel("Materiels") private readonly materielModel: Model<Materiel>,
  ) {}

  async findAll(): Promise<Materiel[]> {
    return await this.materielModel.find().exec();
  }

  async find(query: {} = {}): Promise<Materiel[]> {
    return await this.materielModel
      .find(query)
      .populate("zone")
      .populate("projet")
      .populate("poste")
      .exec();
  }

  async findOne(query: {} = {}): Promise<Materiel> {
    return await this.materielModel.findOne(query).exec();
  }

  async create(materiel: CreateMaterielDto): Promise<Materiel> {
    const doc = new this.materielModel(materiel);
    let document = await this.materielModel.create(doc);
    document = await document
      .populate("projet")
      .populate("zone")
      .populate("poste")
      .execPopulate();
    return document;
  }

  async update(newMateriel: MaterielDto): Promise<Materiel> {
    const newMaterielDocument = await this.materielModel.findOneAndUpdate(
      { id: newMateriel.id },
      new this.materielModel(newMateriel),
    );

    return newMaterielDocument;
  }

  async initMaterielPoste(posteId: number) {
    MATERIELS.forEach(async materiel => {
      const materielToSave = {...materiel, poste: `${posteId}`} as CreateMaterielDto;
      await this.create(materielToSave);
    });
  }

  protected deserialize(document: Materiel[]): MaterielDto[];
  protected deserialize(document: Materiel): MaterielDto;
  protected deserialize(document: Materiel | Materiel[]): MaterielDto | MaterielDto[] {
    return isTypedArray(document)
      ? (document as Materiel[]).map((doc) => new MaterielDto(doc))
      : new MaterielDto(document);
  }
}
