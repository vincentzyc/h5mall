import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from '@src/service/product';
import { ProductResult } from '@src/entity/product';

@Controller('product')
export class ProductController {
  constructor(private readonly ProductService: ProductService) { }

  @Get()
  findAll(@Query() query: Object): Promise<ProductResult> {
    return this.ProductService.findAll(query);
  }
}