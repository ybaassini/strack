import { Model, Mongoose } from "mongoose";
import { Injectable } from "@nestjs/common";
import { CreateConsigneDto } from "./dto/create-consigne.dto";
import { InjectModel } from "@nestjs/mongoose";
import * as _ from "lodash";
import { Consigne } from "./interfaces/consigne.interface";
import { ConsigneDto } from "./dto/consigne.dto";
import { isTypedArray } from "lodash";

const saltRounds = 10;

@Injectable()
export class ConsigneService {
  constructor(
    @InjectModel("Consignes") private readonly consigneModel: Model<Consigne>,
  ) {}

  async findAll(): Promise<Consigne[]> {
    return await this.consigneModel.find().exec();
  }

  async find(query: {} = {}): Promise<Consigne[]> {
    return await this.consigneModel
      .find(query)
      .populate("zone")
      .populate("projet")
      .exec();
  }

  async findOne(query: {} = {}): Promise<Consigne> {
    return await this.consigneModel.findOne(query).exec();
  }

  async create(consigne: CreateConsigneDto): Promise<Consigne> {
    const doc = new this.consigneModel(consigne);
    let document = await this.consigneModel.create(doc);
    document = await document
      .populate("projet")
      .populate("zone")
      .execPopulate();
    return document;
  }

  async update(id: string, newConsigne): Promise<Consigne> {
    const newConsigneDocument = await this.consigneModel.findByIdAndUpdate(
      id,
      { $set: newConsigne},
      { new: true },
    );

    return newConsigneDocument;
  }

  protected deserialize(document: Consigne[]): ConsigneDto[];
  protected deserialize(document: Consigne): ConsigneDto;
  protected deserialize(document: Consigne | Consigne[]): ConsigneDto | ConsigneDto[] {
    return isTypedArray(document)
      ? (document as Consigne[]).map((doc) => new ConsigneDto(doc))
      : new ConsigneDto(document);
  }
}
