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
import { MaterielService } from './materiel.service';
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { MaterielDto } from './dto/materiel.dto';
import { CreateMaterielDto } from './dto/create-materiel.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Materiel')
@Controller('api/materiels')
// @UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class MaterielController {
  constructor(
    private readonly materielService: MaterielService) {}

  @Get('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getMateriels(@Body() request = {}): Promise<IResponse | MaterielDto[]> {
    try {
      const documents = await this.materielService.find(request);
      const materiels = documents.map((document) => new MaterielDto(document));
      return materiels;
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Get('/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  // @ApiParam({name: 'id', type: 'string'})
  async getMateriel(@Param('id') id: string): Promise<IResponse | MaterielDto> {
    try {
      const materiel = await this.materielService.findOne({id: +id});
      return new MaterielDto(materiel);
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('')
  // @Roles('User')
  async createMateriel(@Body() materiel: CreateMaterielDto): Promise<IResponse | MaterielDto> {
    try {
      const document = await this.materielService.create(materiel);
      // await this.baliseService.initBaliseMateriel(document.id);
      return new MaterielDto(document);
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async updateMateriel(@Body() materiel: MaterielDto): Promise<IResponse | MaterielDto> {
    try {
      const document = await this.materielService.update(materiel);
      return new MaterielDto(document);
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

}
