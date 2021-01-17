import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { PdfSchema } from './schemas/pdf.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Pdfs', schema: PdfSchema }])],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
     consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(PdfController);
   }
}