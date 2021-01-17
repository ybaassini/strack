import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { ConsigneController } from './consigne.controller';
import { ConsigneService } from './consigne.service';
import { ConsigneSchema } from './schemas/consigne.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Consignes', schema: ConsigneSchema }])],
  controllers: [ConsigneController],
  providers: [ConsigneService],
})
export class ConsigneModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
     consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(ConsigneController);
   }
}