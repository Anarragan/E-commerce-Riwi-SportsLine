import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ApiKeyService } from '../api-key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API Key requerida');
    }

    const key = await this.apiKeyService.validateApiKey(apiKey);
    if (!key || !key.activo) {
      throw new UnauthorizedException('API Key inválida o inactiva');
    }

    if (key.expiresAt && new Date() > key.expiresAt) {
      throw new UnauthorizedException('API Key expirada');
    }

    request.apiKey = key;
    return true;
  }
}
