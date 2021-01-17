import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  Param,
  Put,
  Response,
  Res,
} from '@nestjs/common';
import { PdfService } from './pdf.service';
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { PdfDto } from './dto/pdf.dto';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pdf')
@Controller('api/pdfs')
// @UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class PdfController {
  constructor(
    private readonly pdfService: PdfService) {}

  @Get('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getPdfs(@Body() request = {}): Promise<IResponse | PdfDto[]> {
    try {
      const documents = await this.pdfService.find(request);
      const pdfs = documents.map((document) => new PdfDto(document));
      return pdfs;
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Get('/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  // @ApiParam({name: 'id', type: 'string'})
  async getPdf(@Param('id') id: string): Promise<IResponse | PdfDto> {
    try {
      const pdf = await this.pdfService.findOne({id: +id});
      return new PdfDto(pdf);
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('')
  // @Roles('User')
  async createPdf(@Body() pdf: CreatePdfDto): Promise<IResponse | PdfDto> {
    try {
      const document = await this.pdfService.create(pdf);
      // await this.baliseService.initBalisePdf(document.id);
      return new PdfDto(document);
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async updatePdf(@Body() pdf: PdfDto): Promise<IResponse | PdfDto> {
    try {
      const document = await this.pdfService.update(pdf);
      return new PdfDto(document);
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

}
