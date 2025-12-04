import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SCOPES_KEY } from '../decorators/scopes.decorator';
import { ApiKeyService } from '../api-key.service';

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private apiKeyService: ApiKeyService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredScopes = this.reflector.getAllAndOverride<string[]>(SCOPES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredScopes) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const apiKey = request.apiKey;

    if (!apiKey) {
      throw new ForbiddenException('API Key requerida para este endpoint');
    }

    for (const scope of requiredScopes) {
      const hasScope = await this.apiKeyService.hasScope(apiKey, scope);
      if (!hasScope) {
        throw new ForbiddenException(`Permiso insuficiente. Se requiere el scope: ${scope}`);
      }
    }

    return true;
  }
}
