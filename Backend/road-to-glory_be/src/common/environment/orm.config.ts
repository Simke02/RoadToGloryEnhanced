import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

export const getOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    username: configService.get('DB_USERNAME', 'postgres'),
    password: configService.get('DB_PASSWORD', 'admin'),
    port: configService.get('DB_PORT', 5432),
    host: configService.get('DB_HOST', 'localhost'),
    database: configService.get('DB_DATABASE', 'road_to_glory'),
    synchronize: configService.get('DB_SYNCHRONIZE', 'true') === 'true',
    entities: ['dist/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
  };
};

// Keep the old config for backward compatibility (non-Docker environments)
export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  password: 'admin',
  port: 5432,
  host: '127.0.0.1',
  database: 'road_to_glory',
  synchronize: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
