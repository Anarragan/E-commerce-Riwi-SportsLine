import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const products = this.productRepository.create({
      ...createProductDto,
      category: { id: createProductDto.category_id },
    });
    return this.productRepository.save(products);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    return this.productRepository.findOne({ where: { id } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const productUpdate = this.productRepository.update( id, updateProductDto);
    return productUpdate;
  }

  remove(id: string) {
    return this.productRepository.delete(id);
  }
}
