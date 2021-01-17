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
import { ProjetService } from './projet.service';
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { ProjetDto } from './dto/projet.dto';
import { CreateProjetDto } from './dto/create-projet.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/projets')
@ApiTags('Projet')
// @UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class ProjetController {
  constructor(private readonly projetService: ProjetService) {}

  @Get('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getProjets(@Body() request = {}): Promise<IResponse> {
    try {
      const documents = await this.projetService.find(request);
      const projets = documents.map((document) => new ProjetDto(document));
      return new ResponseSuccess('COMMON.SUCCESS', projets);
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Get('/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getProjet(@Param('id') id: string): Promise<IResponse> {
    try {
      const projet = await this.projetService.findOne({ id: +id });
      return new ResponseSuccess('COMMON.SUCCESS', new ProjetDto(projet));
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('')
  // @Roles('User')
  async createProjet(@Body() projet: CreateProjetDto): Promise<IResponse> {
    try {
      const document = await this.projetService.create(projet);
      return new ResponseSuccess(
        'PROFILE.UPDATE_SUCCESS',
        new ProjetDto(document),
      );
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

}
