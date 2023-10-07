import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AllExceptionFilter } from './filters/all-exception.filter';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({
    logger: true,
  });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );
  // get httpAdapter
  const httpAdapter = app.get(HttpAdapterHost);

  // logger replace
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // add Filter
  const logger = new Logger();
  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));

  // add pipes
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000, '0.0.0.0');
}

bootstrap();
