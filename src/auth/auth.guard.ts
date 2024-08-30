import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY, IS_REFRESH_KEY } from '../config/accesor.metadata';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('ACCESS_TOKEN') private readonly accessTokenService: JwtService,
    @Inject('REFRESH_TOKEN') private readonly refreshTokenService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const isRefresh = this.reflector.getAllAndOverride<boolean>(
      IS_REFRESH_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(`No auth token received`);
    }

    if (isRefresh) {
      return this.tokenAuth(token, request, this.refreshTokenService);
    }

    return this.tokenAuth(token, request, this.accessTokenService);
  }

  private async tokenAuth(
    token: string,
    request: Request,
    jwtService: JwtService,
  ) {
    try {
      const payload = await jwtService.verifyAsync(token);
      request['auth'] = payload;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
