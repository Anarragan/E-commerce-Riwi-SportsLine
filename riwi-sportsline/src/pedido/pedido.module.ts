import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { PedidoItem } from './entities/pedido-item.entity';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { ClienteModule } from '../cliente/cliente.module';
import { ProductoModule } from '../producto/producto.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, PedidoItem]), ClienteModule, ProductoModule],
  controllers: [PedidoController],
  providers: [PedidoService],
  exports: [PedidoService],
})
export class PedidoModule {}
