/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import * as config from 'config';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');

  const port = process.env.PORT || serverConfig.port;
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
