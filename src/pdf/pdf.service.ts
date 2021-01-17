import { Model, Mongoose } from "mongoose";
import { Injectable } from "@nestjs/common";
import { CreatePdfDto } from "./dto/create-pdf.dto";
import { InjectModel } from "@nestjs/mongoose";
import * as _ from "lodash";
import { Pdf } from "./interfaces/pdf.interface";
import { PdfDto } from "./dto/pdf.dto";
import { isTypedArray } from "lodash";

const saltRounds = 10;

@Injectable()
export class PdfService {
  constructor(
    @InjectModel("Pdfs") private readonly pdfModel: Model<Pdf>,
  ) {}

  async findAll(): Promise<Pdf[]> {
    return await this.pdfModel.find().exec();
  }

  async find(query: {} = {}): Promise<Pdf[]> {
    return await this.pdfModel
      .find(query)
      .populate("zone")
      .populate("projet")
      .exec();
  }

  async findOne(query: {} = {}): Promise<Pdf> {
    return await this.pdfModel.findOne(query).exec();
  }

  async create(pdf: CreatePdfDto): Promise<Pdf> {
    const doc = new this.pdfModel(pdf);
    let document = await this.pdfModel.create(doc);
    document = await document
      .populate("projet")
      .populate("zone")
      .execPopulate();
    return document;
  }

  async update(newPdf: PdfDto): Promise<Pdf> {
    const newPdfDocument = await this.pdfModel.updateOne(
      { id: newPdf.id },
      new this.pdfModel(newPdf)
    );

    return newPdfDocument;
  }

  async createConstat(pdfId: number, constat): Promise<Pdf> {
    return await this.pdfModel
      .findOneAndUpdate(
        { _id: pdfId },
        { $push: { constats: constat } },
        { new: true }
      )
      .exec();
  }

  async updateConstat(pdfId: number, constat): Promise<Pdf> {
    await this.pdfModel.updateOne(
      { _id: pdfId },
      { $pull: { constats: { _id: constat.id } } }
    );
    return await this.pdfModel
      .findOneAndUpdate(
        { _id: pdfId },
        { $push: { constats: constat } },
        { new: true }
      )
      .exec();
  }

  protected deserialize(document: Pdf[]): PdfDto[];
  protected deserialize(document: Pdf): PdfDto;
  protected deserialize(document: Pdf | Pdf[]): PdfDto | PdfDto[] {
    return isTypedArray(document)
      ? (document as Pdf[]).map((doc) => new PdfDto(doc))
      : new PdfDto(document);
  }
}
