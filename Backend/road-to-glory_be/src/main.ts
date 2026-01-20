import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  const port = configService.get<number>('PORT', 3000);
  const corsOrigin = configService.get<string>('CORS_ORIGIN', 'http://localhost:4200');
  
  // Parse CORS origin - handle comma-separated values
  const allowedOrigins = corsOrigin.includes(',') 
    ? corsOrigin.split(',').map(origin => origin.trim())
    : corsOrigin;
  
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  });
  
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
