import { Injectable } from '@nestjs/common';
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
  ) {}

  async create(createClientDto: CreateClientDto) {
    const client = this.clientRepo.create(createClientDto);
    return this.clientRepo.save(client);
  }

  async findAll() {
    return this.clientRepo.find();
  }

  async findOne(id: number) {
    return this.clientRepo.findOne({ where: { id } });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    await this.clientRepo.update(id, updateClientDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.clientRepo.delete(id);
  }
}
