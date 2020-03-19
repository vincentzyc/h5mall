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
  @Post('/carouselList')
  @HttpCode(HttpStatus.OK)
  carouselList() {
    return {
        top:[{
          farmer_id:'1',//	String	是	农户id	
          img:'https://m.360buyimg.com/babel/jfs/t1/86912/31/14823/96913/5e69dfcbE356b5d01/e2a207b99f8cb3ba.png',//	String	是	轮播图片地址	
          link_url:'123',//	String	是	商品跳转链接，456（商品id）、http://baidu.com、优惠券领取页面	
          link_type:'1',//	String	是	跳转类型,1 商品，2 页面链接（H5、小程序），3 app（应用程序）	
          name:'111',//	String	是	名称	
          sort:'2',//	String	是	顺序等级	
          state:'0',//	String	是	位置，0：头部，1：中部
        }],
    };
  }
}
