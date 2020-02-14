import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity, ProductResult } from './product.entity';

interface ProductQuery {
  pageSize?: number;
  pageIndex?: number;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly userRepository: Repository<ProductEntity>,
  ) { }

  async findAll(query: ProductQuery): Promise<ProductResult> {
    const [users, total] = await this.userRepository
      .createQueryBuilder('user')
      .offset(((query.pageIndex || 1) - 1) * (query.pageSize || 0)) // 从多少条开始
      .limit(query.pageSize) // 查询多少条数据
      .getManyAndCount(); // 查询到数据及个数，返回的是一个数组
    return {
      list: users,
      total: total
    };
  }
}
