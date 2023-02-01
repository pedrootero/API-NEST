import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //habilita validações e manipulções de entrada da requisição
      whitelist: true, //vai ignorar todas as propriedades que estao no json que não estão no DTO
      forbidNonWhitelisted: true, //
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}
bootstrap();
