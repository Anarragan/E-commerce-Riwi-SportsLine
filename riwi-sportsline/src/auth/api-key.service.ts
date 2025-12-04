import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from './entities/api-key.entity';
import * as crypto from 'crypto';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private apiKeyRepository: Repository<ApiKey>,
  ) {}

  async generateApiKey(name: string, scopes?: string[]): Promise<ApiKey> {
    const key = `sk_${crypto.randomBytes(32).toString('hex')}`;
    const apiKey = this.apiKeyRepository.create({
      key,
      name,
      scopes: scopes || [],
      activo: true,
    });
    return this.apiKeyRepository.save(apiKey);
  }

  async validateApiKey(key: string): Promise<ApiKey | null> {
    return this.apiKeyRepository.findOne({
      where: { key, activo: true },
    });
  }

  async findAll(): Promise<ApiKey[]> {
    return this.apiKeyRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async revoke(id: string): Promise<void> {
    await this.apiKeyRepository.update(id, { activo: false });
  }

  async hasScope(apiKey: ApiKey, requiredScope: string): Promise<boolean> {
    return apiKey.scopes.includes(requiredScope) || apiKey.scopes.includes('*');
  }
}
