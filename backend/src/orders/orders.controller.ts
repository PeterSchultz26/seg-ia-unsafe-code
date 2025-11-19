import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async create(@Body() body: any) {
    const { userId, productId } = body;

    return this.ordersService.create(userId, productId);
  }
}
