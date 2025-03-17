import './instrument'
import { NestFactory, Reflector } from '@nestjs/core';
import { config } from 'dotenv';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  I18nMiddleware,
  I18nValidationExceptionFilter,
  I18nValidationPipe,
} from 'nestjs-i18n';

import { Logger } from '@/utils';
import { AppModule } from './app.module';
import { config as configEnv, swaggerConfig } from './configs';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter, QueryFailedFilter } from './filters';
import { ValidationExceptionFactory } from './shared';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: Logger.logger,
    cors: true,
  });
  app.enableCors();
  app.use(
    helmet({
      contentSecurityPolicy: false,
      xssFilter: true,
    }),
  );
  app.useGlobalPipes(
    new I18nValidationPipe(),
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: { target: false },
    }),
  );

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      errorFormatter: ValidationExceptionFactory,
    }),
    new QueryFailedFilter(reflector),
    new HttpExceptionFilter(reflector),
  );

  app.use(I18nMiddleware);
  app.setGlobalPrefix(configEnv().prefix);

  const swaggerDocument = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .setTermsOfService(swaggerConfig.termsOfService)
    .addGlobalParameters({
      in: 'header',
      name: 'x-lang',
      required: false,
      description: 'Language kin,en,fr,.....',
      schema: {
        type: 'string',
        default: 'kin',
      },
    })
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerDocument);
  SwaggerModule.setup('docs', app, document);
  await app.listen(configEnv().port);
}
bootstrap();
