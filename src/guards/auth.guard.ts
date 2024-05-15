import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ResponseService } from '@/utils';
import { Request } from 'express';
import { Observable } from 'rxjs';

export type AuthUserType = {
  id: number;
  role: string;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly responseServices: ResponseService,
    private reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();

    const user = request.user as unknown as AuthUserType;
    return roles.some((role) => {
      return role === user.role;
    });
  }
}
