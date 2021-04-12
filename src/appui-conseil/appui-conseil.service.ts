import { Model, Mongoose } from "mongoose";
import { Injectable } from "@nestjs/common";
import { CreateAppuiConseilDto } from "./dto/create-appui-conseil.dto";
import { InjectModel } from "@nestjs/mongoose";
import * as _ from "lodash";
import { AppuiConseil } from "./interfaces/appui-conseil.interface";
import { AppuiConseilDto } from "./dto/appui-conseil.dto";
import { isTypedArray } from "lodash";

const saltRounds = 10;

@Injectable()
export class AppuiConseilService {
  constructor(
    @InjectModel("AppuiConseils") private readonly appuiConseilModel: Model<AppuiConseil>,
  ) {}

  async findAll(): Promise<AppuiConseil[]> {
    return await this.appuiConseilModel.find().exec();
  }

  async find(query: {} = {}): Promise<AppuiConseil[]> {
    return await this.appuiConseilModel
      .find(query)
      .populate("zone")
      .populate("projet")
      .populate("poste")
      .exec();
  }

  async findOne(query: {} = {}): Promise<AppuiConseil> {
    return await this.appuiConseilModel.findOne(query).exec();
  }

  async create(appuiConseil: CreateAppuiConseilDto): Promise<AppuiConseil> {
    const doc = new this.appuiConseilModel(appuiConseil);
    let document = await this.appuiConseilModel.create(doc);
    document = await document
      .populate("projet")
      .populate("zone")
      .populate("poste")
      .execPopulate();
    return document;
  }

  async update(newAppuiConseil: AppuiConseilDto): Promise<AppuiConseil> {
    const newAppuiConseilDocument = await this.appuiConseilModel.updateOne(
      { id: newAppuiConseil.id },
      new this.appuiConseilModel(newAppuiConseil)
    );

    return newAppuiConseilDocument;
  }

  async createConstat(appuiConseilId: number, constat): Promise<AppuiConseil> {
    return await this.appuiConseilModel
      .findOneAndUpdate(
        { _id: appuiConseilId },
        { $push: { constats: constat } },
        { new: true }
      )
      .exec();
  }

  async updateConstat(appuiConseilId: number, constat): Promise<AppuiConseil> {
    await this.appuiConseilModel.updateOne(
      { _id: appuiConseilId },
      { $pull: { constats: { _id: constat.id } } }
    );
    return await this.appuiConseilModel
      .findOneAndUpdate(
        { _id: appuiConseilId },
        { $push: { constats: constat } },
        { new: true }
      )
      .exec();
  }

  protected deserialize(document: AppuiConseil[]): AppuiConseilDto[];
  protected deserialize(document: AppuiConseil): AppuiConseilDto;
  protected deserialize(document: AppuiConseil | AppuiConseil[]): AppuiConseilDto | AppuiConseilDto[] {
    return isTypedArray(document)
      ? (document as AppuiConseil[]).map((doc) => new AppuiConseilDto(doc))
      : new AppuiConseilDto(document);
  }
}
