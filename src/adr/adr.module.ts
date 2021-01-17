import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { AdrController } from './adr.controller';
import { AdrService } from './adr.service';
import { AdrSchema } from './schemas/adr.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Adrs', schema: AdrSchema }])],
  controllers: [AdrController],
  providers: [AdrService],
})
export class AdrModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
     consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(AdrController);
   }
}