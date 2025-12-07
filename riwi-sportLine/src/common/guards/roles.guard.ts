import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PERMISSIONS_KEY } from '../decorators/permission.decorators';
import { Request } from 'express';

interface UserPayload {
  sub: number;
  email: string;
  roles: string[];
  permissions: string[];
}

interface RequestWithUser extends Request {
  user: UserPayload;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles && !requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<RequestWithUser>();

    if (!user) throw new ForbiddenException('User not found in request');

    if (requiredRoles) {
      const hasRole = requiredRoles.some((role) => user.roles?.includes(role));
      if (!hasRole)
        throw new ForbiddenException('Not enough privileges (Role)');
    }
    if (requiredPermissions) {
      const hasPermissions = requiredPermissions.every((permission) =>
        user.permissions?.includes(permission),
      );
      if (!hasPermissions) throw new ForbiddenException('Missing permissions');
    }

    return true;
  }
}
