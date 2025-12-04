import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({
      where: { activo: true },
      relations: ['usuario', 'pedidos'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Cliente> {
    return this.clienteRepository.findOne({
      where: { id },
      relations: ['usuario', 'pedidos', 'pedidos.items'],
    });
  }

  async findByEmail(email: string): Promise<Cliente> {
    return this.clienteRepository.findOne({
      where: { email },
      relations: ['usuario'],
    });
  }

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const clienteData: Partial<Cliente> = {
      ...createClienteDto,
      fechaNacimiento: createClienteDto.fechaNacimiento
        ? new Date(createClienteDto.fechaNacimiento)
        : undefined,
    };
    const cliente = this.clienteRepository.create(clienteData);
    return this.clienteRepository.save(cliente);
  }

  async update(id: string, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const clienteData: Partial<Cliente> = {
      ...updateClienteDto,
      fechaNacimiento: updateClienteDto.fechaNacimiento
        ? new Date(updateClienteDto.fechaNacimiento)
        : undefined,
    };
    await this.clienteRepository.update(id, clienteData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.clienteRepository.update(id, { activo: false });
  }
}
