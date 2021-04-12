import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BaliseModule } from 'balise/balise.module';
import { BaliseService } from 'balise/balise.service';
import { MaterielModule } from 'materiel/materiel.module';
import { MaterielService } from 'materiel/materiel.service';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { PosteController } from './poste.controller';
import { PosteService } from './poste.service';
import { PosteSchema } from './schemas/poste.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Poste', schema: PosteSchema }]), MaterielModule, BaliseModule],
  controllers: [PosteController],
  providers: [PosteService],
})
export class PosteModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
     consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(PosteController);
   }
}