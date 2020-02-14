import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResult } from './product.entity';

@Controller('product')
export class UserController {
  constructor(private readonly ProductService: ProductService) { }

  @Get()
  findAll(@Query() query: Object): Promise<ProductResult> {
    return this.ProductService.findAll(query);
  }
}
