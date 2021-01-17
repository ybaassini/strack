import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { BaliseController } from './balise.controller';
import { BaliseService } from './balise.service';
import { BaliseSchema } from './schemas/balise.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Balise', schema: BaliseSchema }])],
  controllers: [BaliseController],
  providers: [BaliseService],
})
export class BaliseModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
     consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(BaliseController);
   }
}