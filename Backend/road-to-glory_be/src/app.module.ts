import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PersistenceModule } from './persistence/persistence.module';
import { CommunicationModule } from './communication/communication.module';
import { GameObjectModule } from './game_object/game_object.module';
import { MapModule } from './common/providers/map/map.module';
import { UserService } from './common/providers/user/user.service';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { JwtModule } from '@nestjs/jwt';
import configuration from './persistence/configuration/configuration';
import { getOrmConfig } from './common/environment/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env' : 'src/common/environment/.env',
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getOrmConfig,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get("JWT_SECRET", "RFNTQXNkYXMyMWUxKmRzYWRzYQ=="),
        };
      },
      global: true,
    }),
    AuthModule,
    PersistenceModule,
    CommunicationModule,
    GameObjectModule,
    MapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
