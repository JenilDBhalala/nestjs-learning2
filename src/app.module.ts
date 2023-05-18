import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { JobsModule } from './jobs/jobs.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
    JobsModule,
    ConfigModule.forRoot({
      cache: true, // enable caching of environment variables
      expandVariables: true, // enable expand variables in ".env" file
      isGlobal: true, // available globally within the application without importing into modules
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
