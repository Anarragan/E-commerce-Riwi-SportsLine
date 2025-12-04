import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto, UpdateEstadoPedidoDto } from './dto/create-pedido.dto';
import { EstadoPedido } from './entities/pedido.entity';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidoService.create(createPedidoDto);
  }

  @Get()
  findAll(@Query('estado') estado?: EstadoPedido) {
    if (estado) {
      return this.pedidoService.findByEstado(estado);
    }
    return this.pedidoService.findAll();
  }

  @Get('cliente/:clienteId')
  findByCliente(@Param('clienteId') clienteId: string) {
    return this.pedidoService.findByCliente(clienteId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoService.findOne(id);
  }

  @Patch(':id/estado')
  updateEstado(@Param('id') id: string, @Body() updateEstadoDto: UpdateEstadoPedidoDto) {
    return this.pedidoService.updateEstado(id, updateEstadoDto.estado);
  }

  @Patch(':id/cancelar')
  cancelar(@Param('id') id: string) {
    return this.pedidoService.cancelar(id);
  }
}
