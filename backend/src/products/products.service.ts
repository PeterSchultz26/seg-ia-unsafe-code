import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  seedDefaultProduct() {
    const product = this.repo.create({
      nome: 'Ebook "Como Aprender Next.js"',
      descricao: 'Guia completo para aprender Next.js',
      preco: 49.90,
    });

    return this.repo.save(product);
  }
  
  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }
  
}
