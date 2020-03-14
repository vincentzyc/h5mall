import { Controller, HttpCode, HttpStatus, Get, Post, Body, Query } from '@nestjs/common';
import { ProductService } from '@src/service/product';
import { ProductResult } from '@src/entity/product';

@Controller('appProduct')
export class ProductController {
  constructor(private readonly ProductService: ProductService) { }

  @Get()
  findAll(@Query() query: Object): Promise<ProductResult> {
    return this.ProductService.findAll(query);
  }
  @Post('/productType')
  @HttpCode(HttpStatus.OK)
  getProductType() {
    return this.ProductService.getProductType();
  }
}
