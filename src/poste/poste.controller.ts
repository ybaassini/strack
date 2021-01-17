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

@Controller('api/postes')
// @UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class PosteController {
  constructor(
    private readonly posteService: PosteService) {}

  @Get('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async list(@Body() request = {}): Promise<IResponse> {
    try {
      const documents = await this.posteService.find(request);
      const postes = documents.map((document) => new PosteDto(document));
      return new ResponseSuccess('COMMON.SUCCESS', postes);
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Get('/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async get(@Param() params): Promise<IResponse> {
    try {
      const poste = await this.posteService.findOne({id: params.id});
      return new ResponseSuccess('COMMON.SUCCESS', new PosteDto(poste));
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('')
  // @Roles('User')
  async createPoste(@Body() poste: CreatePosteDto): Promise<IResponse> {
    try {
      const document = await this.posteService.create(poste);
      // await this.baliseService.initBalisePoste(document.id);
      return new ResponseSuccess(
        'PROFILE.UPDATE_SUCCESS',
        new PosteDto(document),
      );
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Post('/constat')
  // @Roles('User')
  async createConstat(
    @Body() request: { constat: ConstatDto; posteId: number },
  ): Promise<IResponse> {
    try {
      const document = await this.posteService.createConstat(
        request.posteId,
        request.constat,
      );
      return new ResponseSuccess(
        'PROFILE.UPDATE_SUCCESS',
        new PosteDto(document),
      );
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async update(@Body() poste: PosteDto): Promise<IResponse> {
    try {
      const document = await this.posteService.update(poste);
      return new ResponseSuccess(
        'PROFILE.UPDATE_SUCCESS',
        new PosteDto(document),
      );
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('/constat')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async updateConstat(
    @Body() request: { constat: ConstatDto; posteId: number },
  ): Promise<IResponse> {
    try {
      const document = await this.posteService.updateConstat(
        request.posteId,
        request.constat,
      );
      return new ResponseSuccess(
        'PROFILE.UPDATE_SUCCESS',
        new PosteDto(document),
      );
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }
}
