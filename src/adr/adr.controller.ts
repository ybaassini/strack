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
import { AdrService } from './adr.service';
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { AdrDto } from './dto/adr.dto';
import { CreateAdrDto } from './dto/create-adr.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Adr')
@Controller('api/adrs')
// @UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class AdrController {
  constructor(
    private readonly adrService: AdrService) {}

  @Get('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getAdrs(@Body() request = {}): Promise<IResponse | AdrDto[]> {
    try {
      const documents = await this.adrService.find(request);
      const adrs = documents.map((document) => new AdrDto(document));
      return adrs;
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Get('/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  // @ApiParam({name: 'id', type: 'string'})
  async getAdr(@Param('id') id: string): Promise<IResponse | AdrDto> {
    try {
      const adr = await this.adrService.findOne({id: +id});
      return new AdrDto(adr);
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('')
  // @Roles('User')
  async createAdr(@Body() adr: CreateAdrDto): Promise<IResponse | AdrDto> {
    try {
      const document = await this.adrService.create(adr);
      // await this.baliseService.initBaliseAdr(document.id);
      return new AdrDto(document);
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async updateAdr(@Body() adr: AdrDto): Promise<IResponse | AdrDto> {
    try {
      const document = await this.adrService.update(adr);
      return new AdrDto(document);
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

}
