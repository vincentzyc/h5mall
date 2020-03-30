import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity, ProductResult } from '@src/entity/product';
import { ProductTypeEntity } from '@src/entity/product_type';
import { SpecsEntity } from '@src/entity/specs';

interface ProductQuery {
  pageSize?: number;
  pageIndex?: number;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductTypeEntity)
    private readonly productTypeRepository: Repository<ProductTypeEntity>,
    @InjectRepository(SpecsEntity)
    private readonly specsRepository: Repository<SpecsEntity>,
  ) { }

  async findAll(query: ProductQuery): Promise<ProductResult> {
    const [product, total] = await this.productRepository
      .createQueryBuilder()
      .offset(((query.pageIndex || 1) - 1) * (query.pageSize || 0)) // 从多少条开始
      .limit(query.pageSize) // 查询多少条数据
      .getManyAndCount(); // 查询到数据及个数，返回的是一个数组
    return {
      list: product,
      total: total
    };
  }
  async getProductType(): Promise<any> {
    const productTypes = await this.productTypeRepository
      .createQueryBuilder()
      .getMany();
    return productTypes
  }
  async sysRecommend(): Promise<any> {
    const [products] = await this.productRepository
      .createQueryBuilder()
      .limit(10) // 查询多少条数据;
      .getManyAndCount();
    return products
  }
  carouselList(): Object {
    return {
      top: [{
        farmer_id: '1',//	String	是	农户id	
        img: 'https://m.360buyimg.com/babel/jfs/t1/86912/31/14823/96913/5e69dfcbE356b5d01/e2a207b99f8cb3ba.png',//	String	是	轮播图片地址	
        link_url: '123',//	String	是	商品跳转链接，456（商品id）、http://baidu.com、优惠券领取页面	
        link_type: '1',//	String	是	跳转类型,1 商品，2 页面链接（H5、小程序），3 app（应用程序）	
        name: '111',//	String	是	名称	
        sort: '2',//	String	是	顺序等级	
        state: '0',//	String	是	位置，0：头部，1：中部
      }],
    };
  }
  async productSearch(): Promise<any> {
    const [products] = await this.productRepository
      .createQueryBuilder()
      .limit(10) // 查询多少条数据;
      .getManyAndCount();
    return products
  }
  async productDetail(body: any): Promise<any> {
    const products = await this.productRepository.findOne({ id: body.product_id });
    const specs: Array<SpecsEntity> = await this.specsRepository.find({ productId: body.product_id, state: 1 });
    if (products) return { ...products, specs: specs }
    throw new HttpException('无此产品', HttpStatus.OK);
  }
}
