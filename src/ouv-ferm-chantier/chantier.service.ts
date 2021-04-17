import { Model, Mongoose } from "mongoose";
import { Injectable } from "@nestjs/common";
import { CreateChantierDto } from "./dto/create-chantier.dto";
import { InjectModel } from "@nestjs/mongoose";
import * as _ from "lodash";
import { Chantier } from "./interfaces/chantier.interface";
import { ChantierDto } from "./dto/chantier.dto";
import { isTypedArray } from "lodash";

const saltRounds = 10;

@Injectable()
export class ChantierService {
  constructor(
    @InjectModel("Chantiers") private readonly chantierModel: Model<Chantier>,
  ) {}

  async findAll(): Promise<Chantier[]> {
    return await this.chantierModel.find().exec();
  }

  async find(query: {} = {}): Promise<Chantier[]> {
    return await this.chantierModel
      .find(query)
      .populate("poste")
      .exec();
  }

  async findOne(query: {} = {}): Promise<Chantier> {
    return await this.chantierModel.findOne(query).exec();
  }

  async create(chantier: CreateChantierDto): Promise<Chantier> {
    const doc = new this.chantierModel(chantier);
    let document = await this.chantierModel.create(doc);
    document = await document
      .populate("poste")
      .execPopulate();
    return document;
  }

  async update(newChantier: ChantierDto): Promise<Chantier> {
    const newChantierDocument = await this.chantierModel.updateOne(
      { id: newChantier.id },
      new this.chantierModel(newChantier)
    );

    return newChantierDocument;
  }

  async createConstat(chantierId: number, constat): Promise<Chantier> {
    return await this.chantierModel
      .findOneAndUpdate(
        { _id: chantierId },
        { $push: { constats: constat } },
        { new: true }
      )
      .exec();
  }

  async updateConstat(chantierId: number, constat): Promise<Chantier> {
    await this.chantierModel.updateOne(
      { _id: chantierId },
      { $pull: { constats: { _id: constat.id } } }
    );
    return await this.chantierModel
      .findOneAndUpdate(
        { _id: chantierId },
        { $push: { constats: constat } },
        { new: true }
      )
      .exec();
  }

  protected deserialize(document: Chantier[]): ChantierDto[];
  protected deserialize(document: Chantier): ChantierDto;
  protected deserialize(document: Chantier | Chantier[]): ChantierDto | ChantierDto[] {
    return isTypedArray(document)
      ? (document as Chantier[]).map((doc) => new ChantierDto(doc))
      : new ChantierDto(document);
  }
}
