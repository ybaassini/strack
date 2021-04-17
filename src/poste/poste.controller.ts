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
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseError } from '../common/dto/response.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { ConstatDto } from './dto/constat.dto';
import { PosteDto } from './dto/poste.dto';
import { CreatePosteDto } from './dto/create-poste.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RequestCreateConstatDto } from './dto/request-create-constat.dto';
import { ConsigneDto } from 'consigne/dto/consigne.dto';
import { MaterielDto } from 'materiel/dto/materiel.dto';
import { PdfDto } from 'pdf/dto/pdf.dto';
import { ChantierDto } from 'ouv-ferm-chantier/dto/chantier.dto';
import { BaliseDto } from 'balise/dto/balise.dto';
import { Di82Dto } from 'di82/dto/di82.dto';
import { KrtDto } from 'krt/dto/krt.dto';
import { PlancherDto } from 'ouv-ferm-plancher/dto/plancher.dto';
import {
  BaliseService,
  ChantierService,
  ConsigneService,
  ConstatService,
  Di82Service,
  KrtService,
  MaterielService,
  PdfService,
  PlancherService,
  PosteService,
} from './';
import {
  RequestCreateBaliseDto,
  RequestCreateChantierDto,
  RequestCreateConsigneDto,
  RequestCreateDi82Dto,
  RequestCreateKrtDto,
  RequestCreateMaterielDto,
  RequestCreatePdfDto,
  RequestCreatePlancherDto,
  RequestPosteDto,
} from './dto';

@ApiTags('Poste')
@Controller('api/postes')
// @UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class PosteController {
  constructor(
    private readonly posteService: PosteService,
    private readonly constatService: ConstatService,
    private readonly materielService: MaterielService,
    private readonly krtService: KrtService,
    private readonly pdfService: PdfService,
    private readonly chantierService: ChantierService,
    private readonly plancherService: PlancherService,
    private readonly di82Service: Di82Service,
    private readonly consigneService: ConsigneService,
    private readonly baliseService: BaliseService,
  ) {}

  @Get('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  @ApiBody({
    type: RequestPosteDto,
  })
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
      const poste = await this.posteService.findOne({ _id: id });
      return new PosteDto(poste);
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('')
  // @Roles('User')
  async createPoste(
    @Body() poste: CreatePosteDto,
  ): Promise<IResponse | PosteDto> {
    try {
      const document = await this.posteService.create(poste);
      await this.baliseService.initBalisePoste(document._id.toHexString());
      await this.materielService.initMaterielPoste(document._id.toHexString());
      return new PosteDto(document);
    } catch (error) {
      return new ResponseError('PROFILE.CREATE_ERROR', error);
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

  @Get('/constat/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getConstat(@Param('id') id: string): Promise<IResponse | ConstatDto> {
    try {
      const constat = await this.constatService.findOne(id);
      return constat;
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('/constat')
  // @Roles('User')
  @ApiBody({
    type: RequestCreateConstatDto,
  })
  async createConstat(
    @Body() request: { constat: ConstatDto; posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const poste = await this.constatService.create(
        request.posteId,
        request.constat,
      );
      return poste;
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
      const poste = await this.constatService.update(
        request.posteId,
        request.constat,
      );
      return poste;
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Get('/consigne/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getConsigne(@Param('id') id: string): Promise<IResponse | ConsigneDto> {
    try {
      const consigne = await this.consigneService.findOne(id);
      return consigne;
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('/consigne')
  // @Roles('User')
  @ApiBody({
    type: RequestCreateConsigneDto,
  })
  async createConsigne(
    @Body() request: { consigne: ConsigneDto; posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const poste = await this.consigneService.create(
        request.posteId,
        request.consigne,
      );
      return poste;
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('/consigne')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  @ApiBody({
    type: [RequestCreateConsigneDto],
  })
  async updateConsigne(
    @Body() request: { consigne: ConsigneDto; posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const poste = await this.consigneService.update(
        request.posteId,
        request.consigne,
      );
      return poste;
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Get('/materiel/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getMateriel(@Param('id') id: string): Promise<IResponse | MaterielDto> {
    try {
      const materiel = await this.materielService.findOne(id);
      return materiel;
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('/materiel')
  // @Roles('User')
  @ApiBody({
    type: RequestCreateMaterielDto,
  })
  async createMateriel(
    @Body() request: { materiel: MaterielDto; posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const poste = await this.materielService.create(
        request.posteId,
        request.materiel,
      );
      return poste;
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('/materiel')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  @ApiBody({
    type: [RequestCreateMaterielDto],
  })
  async updateMateriel(
    @Body() request: { materiel: MaterielDto; posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const poste = await this.materielService.update(
        request.posteId,
        request.materiel,
      );
      return poste;
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Get('/pdf/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getPdf(@Param('id') id: string): Promise<IResponse | PdfDto> {
    try {
      const pdf = await this.pdfService.findOne(id);
      return pdf;
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('/pdf')
  // @Roles('User')
  @ApiBody({
    type: RequestCreatePdfDto,
  })
  async createPdf(
    @Body() request: { pdf: PdfDto; posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const poste = await this.pdfService.create(request.posteId, request.pdf);
      return poste;
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('/pdf')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  @ApiBody({
    type: [RequestCreatePdfDto],
  })
  async updatePdf(
    @Body() request: { pdf: PdfDto; posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const poste = await this.pdfService.update(request.posteId, request.pdf);
      return poste;
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Get('/chantier/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getChantier(@Param('id') id: string): Promise<IResponse | ChantierDto> {
    try {
      const chantier = await this.chantierService.findOne(id);
      return chantier;
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('/chantier')
  // @Roles('User')
  @ApiBody({
    type: RequestCreateChantierDto,
  })
  async createChantierDto(
    @Body() request: { chantier: ChantierDto; posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const poste = await this.chantierService.create(
        request.posteId,
        request.chantier,
      );
      return poste;
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('/chantier')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  @ApiBody({
    type: [RequestCreateChantierDto],
  })
  async updateChantier(
    @Body() request: { chantier: ChantierDto; posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const poste = await this.chantierService.update(
        request.posteId,
        request.chantier,
      );
      return poste;
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Get('/plancher/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getPlancher(@Param('id') id: string): Promise<IResponse | PlancherDto> {
    try {
      const plancher = await this.plancherService.findOne(id);
      return plancher;
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('/plancher')
  // @Roles('User')
  @ApiBody({
    type: RequestCreatePlancherDto,
  })
  async createPlancherDto(
    @Body() request: { plancher: PlancherDto; posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const poste = await this.plancherService.create(
        request.posteId,
        request.plancher,
      );
      return poste;
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('/plancher')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  @ApiBody({
    type: [RequestCreatePlancherDto],
  })
  async updatePlancher(
    @Body() request: { plancher: PlancherDto; posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const poste = await this.plancherService.update(
        request.posteId,
        request.plancher,
      );
      return poste;
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Get('/krt/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getKrt(@Param('id') id: string): Promise<IResponse | KrtDto> {
    try {
      const krt = await this.krtService.findOne(id);
      return krt;
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('/krt')
  // @Roles('User')
  @ApiBody({
    type: RequestCreateKrtDto,
  })
  async createKrtDto(
    @Body() request: { krt: KrtDto; posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const poste = await this.krtService.create(request.posteId, request.krt);
      return poste;
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('/krt')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  @ApiBody({
    type: [RequestCreateKrtDto],
  })
  async updateKrt(
    @Body() request: { krt: KrtDto; posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const poste = await this.krtService.update(request.posteId, request.krt);
      return poste;
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Get('/di82/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getDi82(@Param('id') id: string): Promise<IResponse | Di82Dto> {
    try {
      const di82 = await this.di82Service.findOne(id);
      return di82;
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('/di82')
  // @Roles('User')
  @ApiBody({
    type: RequestCreateDi82Dto,
  })
  async createDi82Dto(
    @Body() request: { di82: Di82Dto; posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const poste = await this.di82Service.create(
        request.posteId,
        request.di82,
      );
      return poste;
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('/di82')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  @ApiBody({
    type: [RequestCreateDi82Dto],
  })
  async updateDi82(
    @Body() request: { di82: Di82Dto; posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const poste = await this.di82Service.update(
        request.posteId,
        request.di82,
      );
      return poste;
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Get('/balise/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getBalise(@Param('id') id: string): Promise<IResponse | BaliseDto> {
    try {
      const balise = await this.baliseService.findOne(id);
      return balise;
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('/balise')
  // @Roles('User')
  @ApiBody({
    type: RequestCreateBaliseDto,
  })
  async createBaliseDto(
    @Body() request: { balise: BaliseDto; posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const poste = await this.baliseService.create(
        request.posteId,
        request.balise,
      );
      return poste;
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('/balise')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  @ApiBody({
    type: [RequestCreateBaliseDto],
  })
  async updateBalise(
    @Body() request: { balise: BaliseDto; posteId: number },
  ): Promise<IResponse | PosteDto> {
    try {
      const poste = await this.baliseService.update(
        request.posteId,
        request.balise,
      );
      return poste;
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }
}
