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
  @Post('/sysRecommend')
  @HttpCode(HttpStatus.OK)
  sysRecommend() {
    return this.ProductService.sysRecommend();
  }
  @Post('/carouselList')
  @HttpCode(HttpStatus.OK)
  carouselList() {
    return this.ProductService.carouselList();
  }
  @Post('/productSearch')
  @HttpCode(HttpStatus.OK)
  productSearch(@Body() body: any) {
    return this.ProductService.productSearch(body);
  }
  @Post('/productDetail')
  @HttpCode(HttpStatus.OK)
  productDetail(@Body() body: any) {
    return this.ProductService.productDetail(body);
  }
  @Post('/recommend')
  @HttpCode(HttpStatus.OK)
  recommend(@Body() body: any) {
    return this.ProductService.recommend();
  }
}
