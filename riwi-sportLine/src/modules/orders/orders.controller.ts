import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('orders')
@ApiBearerAuth('JWT-auth')
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva orden (Usuario autenticado)' })
  @ApiResponse({ status: 201, description: 'Orden creada exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las órdenes (Usuario autenticado)' })
  @ApiResponse({ status: 200, description: 'Lista de órdenes' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener orden por ID (Usuario autenticado)' })
  @ApiResponse({ status: 200, description: 'Orden encontrada' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar orden (Usuario autenticado)' })
  @ApiResponse({ status: 200, description: 'Orden actualizada' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar orden (Usuario autenticado)' })
  @ApiResponse({ status: 200, description: 'Orden eliminada' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  remove(@Param('id') id: number) {
    return this.ordersService.remove(id);
  }
}
