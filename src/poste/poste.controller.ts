import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  Param,
  Put,
} from '@nestjs/common';
import { PosteService } from './poste.service';
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { ConstatDto } from './dto/constat.dto';
import { PosteDto } from './dto/poste.dto';
import { CreatePosteDto } from './dto/create-poste.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RequestCreateConstatDto } from './dto/request-create-constat.dto';
import { MaterielService } from '../materiel/materiel.service';
import { BaliseService } from '../balise/balise.service';
import { ObjectId } from 'mongodb';

@ApiTags('Poste')
@Controller('api/postes')

// @UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class PosteController {
  constructor(
    private readonly posteService: PosteService,
    private readonly materielService: MaterielService,
    private readonly baliseService: BaliseService) {}

  @Get('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getPostes(@Body() request = {}): Promise<IResponse | PosteDto[]> {
    try {
      const documents = await this.posteService.find(request);
      const postes = documents.map((document) => new PosteDto(document));
      return postes;
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Get('/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getPoste(@Param('id') id: string): Promise<IResponse | PosteDto> {
    try {
      const poste = await this.posteService.findOne({_id: id});
      return new PosteDto(poste);
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Get('/constat/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getConstat(@Param('id') id: string): Promise<IResponse | ConstatDto> {
    try {
      const query = { constats: { $elemMatch: { _id: id } } };
      const poste = await this.posteService.findOne(query);
      const posteDto = new PosteDto(poste);
      return posteDto.constats.filter(constat => constat.id === id)[0];
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('')
  // @Roles('User')
  async createPoste(@Body() poste: CreatePosteDto): Promise<IResponse | PosteDto> {
    try {
      const document = await this.posteService.create(poste);
      await this.baliseService.initBalisePoste(document._id.toHexString());
      await this.materielService.initMaterielPoste(document._id.toHexString());
      return new PosteDto(document);
    } catch (error) {
      return new ResponseError('PROFILE.CREATE_ERROR', error);
    }
  }

  @Post('/constat')
  // @Roles('User')
  @ApiBody({
    type: RequestCreateConstatDto,
  })
  async createConstat(
    @Body() request: { constat: ConstatDto, posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const document = await this.posteService.createConstat(
        request.posteId,
        request.constat,
      );
      return new PosteDto(document);
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async updatePoste(@Body() poste: PosteDto): Promise<IResponse | PosteDto> {
    try {
      const document = await this.posteService.update(poste);
      return new PosteDto(document);
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('/constat')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  @ApiBody({
    type: [RequestCreateConstatDto],
  })
  async updateConstat(
    @Body() request: { constat: ConstatDto; posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const document = await this.posteService.updateConstat(
        request.posteId,
        request.constat,
      );
      return new PosteDto(document);
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }
}
