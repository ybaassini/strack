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
import { AppuiConseilService } from './appui-conseil.service';
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { AppuiConseilDto } from './dto/appui-conseil.dto';
import { CreateAppuiConseilDto } from './dto/create-appui-conseil.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AppuiConseil')
@Controller('api/appui-conseils')
// @UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class AppuiConseilController {
  constructor(
    private readonly appuiConseilService: AppuiConseilService) {}

  @Get('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getAppuiConseils(@Body() request = {}): Promise<IResponse | AppuiConseilDto[]> {
    try {
      const documents = await this.appuiConseilService.find(request);
      const appuiConseils = documents.map((document) => new AppuiConseilDto(document));
      return appuiConseils;
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Get('/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  // @ApiParam({name: 'id', type: 'string'})
  async getAppuiConseil(@Param('id') id: string): Promise<IResponse | AppuiConseilDto> {
    try {
      const appuiConseil = await this.appuiConseilService.findOne({id: +id});
      return new AppuiConseilDto(appuiConseil);
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('')
  // @Roles('User')
  async createAppuiConseil(@Body() appuiConseil: CreateAppuiConseilDto): Promise<IResponse | AppuiConseilDto> {
    try {
      const document = await this.appuiConseilService.create(appuiConseil);
      // await this.baliseService.initBaliseAppuiConseil(document.id);
      return new AppuiConseilDto(document);
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async updateAppuiConseil(@Body() appuiConseil: AppuiConseilDto): Promise<IResponse | AppuiConseilDto> {
    try {
      const document = await this.appuiConseilService.update(appuiConseil);
      return new AppuiConseilDto(document);
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

}
