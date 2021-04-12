import { Model, Mongoose } from "mongoose";
import { Injectable } from "@nestjs/common";
import { CreateDi82Dto } from "./dto/create-di82.dto";
import { InjectModel } from "@nestjs/mongoose";
import * as _ from "lodash";
import { Di82 } from "./interfaces/di82.interface";
import { Di82Dto } from "./dto/di82.dto";
import { isTypedArray } from "lodash";

const saltRounds = 10;

@Injectable()
export class Di82Service {
  constructor(
    @InjectModel("Di82s") private readonly di82Model: Model<Di82>,
  ) {}

  async findAll(): Promise<Di82[]> {
    return await this.di82Model.find().exec();
  }

  async find(query: {} = {}): Promise<Di82[]> {
    return await this.di82Model
      .find(query)
      .populate("zone")
      .populate("projet")
      .populate("poste")
      .exec();
  }

  async findOne(query: {} = {}): Promise<Di82> {
    return await this.di82Model.findOne(query).exec();
  }

  async create(di82: CreateDi82Dto): Promise<Di82> {
    const doc = new this.di82Model(di82);
    let document = await this.di82Model.create(doc);
    document = await document
      .populate("projet")
      .populate("zone")
      .populate("poste")
      .execPopulate();
    return document;
  }

  async update(newDi82: Di82Dto): Promise<Di82> {
    const newDi82Document = await this.di82Model.updateOne(
      { id: newDi82.id },
      new this.di82Model(newDi82)
    );

    return newDi82Document;
  }

  async createConstat(di82Id: number, constat): Promise<Di82> {
    return await this.di82Model
      .findOneAndUpdate(
        { _id: di82Id },
        { $push: { constats: constat } },
        { new: true }
      )
      .exec();
  }

  async updateConstat(di82Id: number, constat): Promise<Di82> {
    await this.di82Model.updateOne(
      { _id: di82Id },
      { $pull: { constats: { _id: constat.id } } }
    );
    return await this.di82Model
      .findOneAndUpdate(
        { _id: di82Id },
        { $push: { constats: constat } },
        { new: true }
      )
      .exec();
  }

  protected deserialize(document: Di82[]): Di82Dto[];
  protected deserialize(document: Di82): Di82Dto;
  protected deserialize(document: Di82 | Di82[]): Di82Dto | Di82Dto[] {
    return isTypedArray(document)
      ? (document as Di82[]).map((doc) => new Di82Dto(doc))
      : new Di82Dto(document);
  }
}
