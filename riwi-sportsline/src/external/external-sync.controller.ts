// src/external/external-sync.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiKey } from '../common/decorators/api-key.decorator';
import { ApiKeyGuard } from '../auth/guards/api-key.guard';

@ApiTags('external-sync')
@UseGuards(ApiKeyGuard)
@Controller('external-sync')
export class ExternalSyncController {
  @Get('push')
  @ApiKey()
  @ApiOperation({ summary: 'Push de datos vía x-api-key' })
  @ApiResponse({ status: 200, description: 'Sincronización aceptada' })
  @ApiResponse({ status: 401, description: 'x-api-key faltante o inválida' })
  @ApiResponse({ status: 403, description: 'API Key no configurada' })
  pushData() {
    return { ok: true, message: 'Datos recibidos y procesados' };
  }
}
