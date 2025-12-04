import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find({
      where: { activo: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Producto> {
    return this.productoRepository.findOne({
      where: { id },
      relations: ['pedidoItems'],
    });
  }

  async findByCategoria(categoria: string): Promise<Producto[]> {
    return this.productoRepository.find({
      where: { categoria, activo: true },
    });
  }

  async create(productoData: Partial<Producto>): Promise<Producto> {
    const producto = this.productoRepository.create(productoData);
    return this.productoRepository.save(producto);
  }

  async update(id: string, productoData: Partial<Producto>): Promise<Producto> {
    await this.productoRepository.update(id, productoData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productoRepository.update(id, { activo: false });
  }

  async actualizarStock(id: string, cantidad: number): Promise<Producto> {
    const producto = await this.findOne(id);
    producto.stock += cantidad;
    return this.productoRepository.save(producto);
  }
}
