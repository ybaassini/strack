import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { ProjetController } from './projet.controller';
import { ProjetService } from './projet.service';
import { ProjetSchema } from './schemas/projet.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Projets', schema: ProjetSchema }])],
  controllers: [ProjetController],
  providers: [ProjetService],
})
export class ProjetModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
     consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(ProjetController);
   }
}