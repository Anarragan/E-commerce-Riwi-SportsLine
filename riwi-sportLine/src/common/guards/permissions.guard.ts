import { Injectable, CanActivate } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: any): boolean {
    
    //response the permissions required
    const requiredPermissions = this.reflector.get<string[]>(
      "permissions",
      context.getHandler()
    );

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const userPermissions = user.permissions.map((permission: any) => permission.name);

    return requiredPermissions.every((permission) => userPermissions.includes(permission));

  }

}