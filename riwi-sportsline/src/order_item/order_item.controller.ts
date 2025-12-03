import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderItemService } from './order_item.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('order-items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Crear un ítem de orden' })
  @ApiResponse({ status: 201, description: 'OrderItem creado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get()
  @Roles('admin', 'analyst')
  @ApiOperation({ summary: 'Obtener todos los ítems de orden' })
  @ApiResponse({ status: 200, description: 'Lista de OrderItems' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'analyst')
  @ApiOperation({ summary: 'Obtener un ítem de orden por ID' })
  @ApiResponse({ status: 200, description: 'OrderItem encontrado' })
  @ApiResponse({ status: 404, description: 'OrderItem no encontrado' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizar un ítem de orden' })
  @ApiResponse({ status: 200, description: 'OrderItem actualizado' })
  @ApiResponse({ status: 404, description: 'OrderItem no encontrado' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar un ítem de orden' })
  @ApiResponse({ status: 204, description: 'OrderItem eliminado' })
  @ApiResponse({ status: 404, description: 'OrderItem no encontrado' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemService.remove(id);
  }
}
