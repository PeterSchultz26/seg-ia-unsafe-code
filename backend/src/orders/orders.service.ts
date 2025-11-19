import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private repo: Repository<Order>,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async create(userId: number, productId: number) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const product = await this.productsService.findById(productId);
    if (!product) throw new NotFoundException('Produto não encontrado');

    const order = this.repo.create({
      user,
      product,
      status: 'confirmado',
    });

    return this.repo.save(order);
  }
}
