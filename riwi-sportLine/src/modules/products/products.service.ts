import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create({
      ...createProductDto,
      price: createProductDto.price,
    });
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updateData: Partial<Product> = { ...updateProductDto };
    await this.productRepository.update({ id }, updateData);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.productRepository.delete({ id });
  }
}
