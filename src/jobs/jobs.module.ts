import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import {
  UserAgentMiddleware,
  UserAgentOptions,
} from './middlewares/user-agent.middleware';

@Module({
  controllers: [JobsController],
  providers: [
    JobsService,
    {
      provide: UserAgentOptions,
      useValue: { accepted: ['chrome', 'firefox', 'postman'] },
    },
  ],
})
export class JobsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAgentMiddleware)
      .exclude({ path: 'jobs', method: RequestMethod.POST })
      .forRoutes('jobs');
  }
}
