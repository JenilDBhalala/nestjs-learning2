import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //setting swagger for user module
  const options = new DocumentBuilder()
    .setTitle('User Module')
    .setDescription('The user API description')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const userDocument = SwaggerModule.createDocument(app, options, {
    include: [UsersModule],
  });

  SwaggerModule.setup('api/users', app, userDocument);

  //setting swagger for job module
  const secondOptions = new DocumentBuilder()
    .setTitle('Job Module')
    .setDescription('The job API description')
    .setVersion('1.0')
    .addTag('jobs')
    .build();

  const jobDocument = SwaggerModule.createDocument(app, secondOptions, {
    include: [JobsModule],
  });

  SwaggerModule.setup('api/jobs', app, jobDocument);

  app.use(cookieSession({ keys: ['ahjskjk'] }));
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidUnknownValues: true }),
  );
  await app.listen(3001);
}
bootstrap();
