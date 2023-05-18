import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import {
  userAgent,
  UserAgentMiddleware,
} from './middlewares/user-agent.middleware';

@Module({
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAgentMiddleware).forRoutes('jobs');
  }
}
