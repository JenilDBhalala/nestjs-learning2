import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function userAgent(req: Request, res: Response, next: NextFunction) {
  const ua = req.headers['user-agent'];
  req['ua'] = ua;
  next();
}

@Injectable()
export class UserAgentMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ua = req.headers['user-agent'];

    if (!this.isUserAgentAcceptable(ua)) {
      throw new ForbiddenException('Not Allowed');
    }
    req['ua'] = ua;

    next();
  }

  private isUserAgentAcceptable(userAgent: string) {
    const acceptableUserAgents = ['chrome', 'firefox'];

    return acceptableUserAgents.some((ua) =>
      userAgent.toLowerCase().includes(ua.toLowerCase()),
    );
  }
}
