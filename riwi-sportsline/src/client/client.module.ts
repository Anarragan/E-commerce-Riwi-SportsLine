import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Client])], // 👈 esto es clave
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService], // opcional, si lo usas en otros módulos
})
export class ClientModule {}