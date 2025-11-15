import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";
import { ObjectId } from "mongodb";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create({
      ...createProductDto,
      price: (createProductDto.price),
    });
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    return this.productRepository.findOne({ 
      where: {id: new ObjectId(id) }
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updateData = { ...updateProductDto } as any;
    if (updateData.price !== undefined) {
      updateData.price = (updateData.price);
    }
    await this.productRepository.update({
      id: new ObjectId(id)}, 
      updateData,
    );
    return this.findOne(id);
  }

  remove(id: string) {
    return this.productRepository.delete({ id: new ObjectId(id) });
  }
}
