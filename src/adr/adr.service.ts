import { Model, Mongoose } from "mongoose";
import { Injectable } from "@nestjs/common";
import { CreateAdrDto } from "./dto/create-adr.dto";
import { InjectModel } from "@nestjs/mongoose";
import * as _ from "lodash";
import { Adr } from "./interfaces/adr.interface";
import { AdrDto } from "./dto/adr.dto";
import { isTypedArray } from "lodash";

const saltRounds = 10;

@Injectable()
export class AdrService {
  constructor(
    @InjectModel("Adrs") private readonly adrModel: Model<Adr>,
  ) {}

  async findAll(): Promise<Adr[]> {
    return await this.adrModel.find().exec();
  }

  async find(query: {} = {}): Promise<Adr[]> {
    return await this.adrModel
      .find(query)
      .populate("zone")
      .populate("projet")
      .exec();
  }

  async findOne(query: {} = {}): Promise<Adr> {
    return await this.adrModel.findOne(query).exec();
  }

  async create(adr: CreateAdrDto): Promise<Adr> {
    const doc = new this.adrModel(adr);
    let document = await this.adrModel.create(doc);
    document = await document
      .populate("projet")
      .populate("zone")
      .execPopulate();
    return document;
  }

  async update(newAdr: AdrDto): Promise<Adr> {
    const newAdrDocument = await this.adrModel.updateOne(
      { id: newAdr.id },
      new this.adrModel(newAdr)
    );

    return newAdrDocument;
  }

  async createConstat(adrId: number, constat): Promise<Adr> {
    return await this.adrModel
      .findOneAndUpdate(
        { _id: adrId },
        { $push: { constats: constat } },
        { new: true }
      )
      .exec();
  }

  async updateConstat(adrId: number, constat): Promise<Adr> {
    await this.adrModel.updateOne(
      { _id: adrId },
      { $pull: { constats: { _id: constat.id } } }
    );
    return await this.adrModel
      .findOneAndUpdate(
        { _id: adrId },
        { $push: { constats: constat } },
        { new: true }
      )
      .exec();
  }

  protected deserialize(document: Adr[]): AdrDto[];
  protected deserialize(document: Adr): AdrDto;
  protected deserialize(document: Adr | Adr[]): AdrDto | AdrDto[] {
    return isTypedArray(document)
      ? (document as Adr[]).map((doc) => new AdrDto(doc))
      : new AdrDto(document);
  }
}
