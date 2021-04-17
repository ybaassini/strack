import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { default as config } from "./config";
import { PosteModule } from "./poste/poste.module";
import { ProjetModule } from "./projet/projet.module";
import { ZoneModule } from "./zone/zone.module";
import { RiskModule } from "./risk/risk.module";

const userString =
  config.db.user && config.db.pass
    ? config.db.user + ":" + config.db.pass + "@"
    : "";
const authSource = config.db.authSource
  ? "?authSource=" + config.db.authSource + "&w=1"
  : "";

@Module({
  imports: [
    MongooseModule.forRoot(config.db.host, { useNewUrlParser: true }),
    UsersModule,
    PosteModule,
    ProjetModule,
    ZoneModule,
    RiskModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
