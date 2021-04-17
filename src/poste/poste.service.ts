import { Model, Mongoose } from "mongoose";
import { Injectable } from "@nestjs/common";
import { CreatePosteDto } from "./dto/create-poste.dto";
import { Constat } from "./interfaces/constat.interface";
import { InjectModel } from "@nestjs/mongoose";
import * as _ from "lodash";
import { Poste } from "./interfaces/poste.interface";
import { ConstatDto } from "./dto/constat.dto";
import { PosteDto } from "./dto/poste.dto";
import { isArray } from "util";
import { isTypedArray } from "lodash";
import { SURVEILLANCE_GLOBALE } from "common/data/balise.data";

const saltRounds = 10;

@Injectable()
export class PosteService {
  constructor(
    @InjectModel("Poste") private readonly posteModel: Model<Poste>
  ) {}

  async findAll(): Promise<Poste[]> {
    return await this.posteModel.find().exec();
  }

  async find(query: {} = {}): Promise<Poste[]> {
    return await this.posteModel
      .find(query)
      .populate({ 
        path: 'constats',
        populate: {
          path: 'typeRisk',
          model: 'risques',
        } 
     })
      .exec();
  }

  async findOne(query: {} = {}): Promise<Poste> {
    return await this.posteModel.findOne(query).exec();
  }

  async create(poste: CreatePosteDto): Promise<Poste> {
    const doc = new this.posteModel(poste);
    let document = await this.posteModel.create(doc);
    document = await document
      .execPopulate();
    return document;
  }

  async update(newPoste: PosteDto): Promise<Poste> {
    const newPosteDocument = await this.posteModel.updateOne(
      { id: newPoste.id },
      new this.posteModel(newPoste)
    );

    return newPosteDocument;
  }

  protected deserialize(document: Poste[]): PosteDto[];
  protected deserialize(document: Poste): PosteDto;
  protected deserialize(document: Poste | Poste[]): PosteDto | PosteDto[] {
    return isTypedArray(document)
      ? (document as Poste[]).map((doc) => new PosteDto(doc))
      : new PosteDto(document);
  }
}
