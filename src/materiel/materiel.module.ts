import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { MaterielController } from './materiel.controller';
import { MaterielService } from './materiel.service';
import { MaterielSchema } from './schemas/materiel.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Materiels', schema: MaterielSchema }])],
  controllers: [MaterielController],
  providers: [MaterielService],
  exports: [MaterielService]
})
export class MaterielModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
     consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(MaterielController);
   }
}