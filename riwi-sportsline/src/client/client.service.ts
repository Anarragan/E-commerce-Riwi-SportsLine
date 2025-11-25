import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) { }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = this.clientRepo.create(createClientDto);
    return this.clientRepo.save(client);
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepo.find();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepo.findOneBy({ id });
    if (!client) {
      throw new NotFoundException("Cliente no encontrado")
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.clientRepo.findOneBy({ id })
    if (!client) {
      throw new NotFoundException("Cliente no encontrado")
    }
    Object.assign(client, updateClientDto);
    return await this.clientRepo.save(client)
  }

  async remove(id: number): Promise<void> {
    const client = await this.clientRepo.findOneBy({ id })
    if (!client) {
      throw new NotFoundException("Cliente no encontrado")
    }
    await this.clientRepo.delete(id);
  }
}
