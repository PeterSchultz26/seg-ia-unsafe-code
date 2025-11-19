import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async list() {
    const products = await this.productsService.findAll();

    // se o banco estiver vazio, cria o produto padrão
    if (products.length === 0) {
        console.log(products);
      const created = await this.productsService.seedDefaultProduct();
      return [created];
    }

    return products;
  }
}
