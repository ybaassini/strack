import { Model, Mongoose } from "mongoose";
import { Injectable } from "@nestjs/common";
import { CreatePlancherDto } from "./dto/create-plancher.dto";
import { InjectModel } from "@nestjs/mongoose";
import * as _ from "lodash";
import { Plancher } from "./interfaces/plancher.interface";
import { PlancherDto } from "./dto/plancher.dto";
import { isTypedArray } from "lodash";

const saltRounds = 10;

@Injectable()
export class PlancherService {
  constructor(
    @InjectModel("Planchers") private readonly plancherModel: Model<Plancher>,
  ) {}

  async findAll(): Promise<Plancher[]> {
    return await this.plancherModel.find().exec();
  }

  async find(query: {} = {}): Promise<Plancher[]> {
    return await this.plancherModel
      .find(query)
      .populate("zone")
      .populate("projet")
      .exec();
  }

  async findOne(query: {} = {}): Promise<Plancher> {
    return await this.plancherModel.findOne(query).exec();
  }

  async create(plancher: CreatePlancherDto): Promise<Plancher> {
    const doc = new this.plancherModel(plancher);
    let document = await this.plancherModel.create(doc);
    document = await document
      .populate("projet")
      .populate("zone")
      .execPopulate();
    return document;
  }

  async update(newPlancher: PlancherDto): Promise<Plancher> {
    const newPlancherDocument = await this.plancherModel.updateOne(
      { id: newPlancher.id },
      new this.plancherModel(newPlancher)
    );

    return newPlancherDocument;
  }

  async createConstat(plancherId: number, constat): Promise<Plancher> {
    return await this.plancherModel
      .findOneAndUpdate(
        { _id: plancherId },
        { $push: { constats: constat } },
        { new: true }
      )
      .exec();
  }

  async updateConstat(plancherId: number, constat): Promise<Plancher> {
    await this.plancherModel.updateOne(
      { _id: plancherId },
      { $pull: { constats: { _id: constat.id } } }
    );
    return await this.plancherModel
      .findOneAndUpdate(
        { _id: plancherId },
        { $push: { constats: constat } },
        { new: true }
      )
      .exec();
  }

  protected deserialize(document: Plancher[]): PlancherDto[];
  protected deserialize(document: Plancher): PlancherDto;
  protected deserialize(document: Plancher | Plancher[]): PlancherDto | PlancherDto[] {
    return isTypedArray(document)
      ? (document as Plancher[]).map((doc) => new PlancherDto(doc))
      : new PlancherDto(document);
  }
}
