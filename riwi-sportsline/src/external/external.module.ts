// src/external/external.module.ts
import { Module } from '@nestjs/common';
import { ExternalSyncController } from './external-sync.controller';

@Module({
  controllers: [ExternalSyncController],
})
export class ExternalModule {}
