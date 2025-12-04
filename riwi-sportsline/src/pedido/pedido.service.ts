import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido, EstadoPedido } from './entities/pedido.entity';
import { PedidoItem } from './entities/pedido-item.entity';
import { ClienteService } from '../cliente/cliente.service';
import { ProductoService } from '../producto/producto.service';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    @InjectRepository(PedidoItem)
    private pedidoItemRepository: Repository<PedidoItem>,
    private clienteService: ClienteService,
    private productoService: ProductoService,
  ) {}

  async findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      relations: ['cliente', 'items', 'items.producto'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Pedido> {
    return this.pedidoRepository.findOne({
      where: { id },
      relations: ['cliente', 'items', 'items.producto'],
    });
  }

  async findByCliente(clienteId: string): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      where: { cliente_id: clienteId },
      relations: ['items', 'items.producto'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByEstado(estado: EstadoPedido): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      where: { estado },
      relations: ['cliente', 'items'],
    });
  }

  async create(pedidoData: {
    cliente_id: string;
    items: Array<{ producto_id: string; cantidad: number }>;
    direccionEnvio?: string;
    ciudadEnvio?: string;
    codigoPostalEnvio?: string;
    metodoPago?: string;
    notas?: string;
  }): Promise<Pedido> {
    // Verificar que el cliente existe
    const cliente = await this.clienteService.findOne(pedidoData.cliente_id);
    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }

    // Calcular totales
    let subtotal = 0;
    const items: PedidoItem[] = [];

    for (const item of pedidoData.items) {
      const producto = await this.productoService.findOne(item.producto_id);
      if (!producto) {
        throw new NotFoundException(`Producto ${item.producto_id} no encontrado`);
      }
      if (producto.stock < item.cantidad) {
        throw new BadRequestException(`Stock insuficiente para ${producto.nombre}`);
      }

      const precioUnitario = producto.precio;
      const itemSubtotal = precioUnitario * item.cantidad;
      subtotal += itemSubtotal;

      const pedidoItem = this.pedidoItemRepository.create({
        producto_id: item.producto_id,
        cantidad: item.cantidad,
        precioUnitario,
        subtotal: itemSubtotal,
      });
      items.push(pedidoItem);

      // Actualizar stock
      await this.productoService.actualizarStock(item.producto_id, -item.cantidad);
    }

    const impuestos = subtotal * 0.19; // 19% IVA
    const total = subtotal + impuestos;

    // Generar número de pedido único
    const numeroPedido = `PED-${Date.now()}-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

    const pedido = this.pedidoRepository.create({
      ...pedidoData,
      numeroPedido,
      subtotal,
      impuestos,
      total,
      estado: EstadoPedido.PENDIENTE,
      items,
    });

    return this.pedidoRepository.save(pedido);
  }

  async updateEstado(id: string, estado: EstadoPedido): Promise<Pedido> {
    await this.pedidoRepository.update(id, { estado });
    return this.findOne(id);
  }

  async cancelar(id: string): Promise<Pedido> {
    const pedido = await this.findOne(id);
    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado');
    }

    // Restaurar stock si el pedido estaba confirmado o en proceso
    if (pedido.estado === EstadoPedido.CONFIRMADO || pedido.estado === EstadoPedido.EN_PROCESO) {
      for (const item of pedido.items) {
        await this.productoService.actualizarStock(item.producto_id, item.cantidad);
      }
    }

    await this.pedidoRepository.update(id, {
      estado: EstadoPedido.CANCELADO,
    });
    return this.findOne(id);
  }
}
