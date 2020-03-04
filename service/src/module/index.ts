import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from '@src/service/user.service';
import { ProductService } from '@src/service/product.service';

import { UserController } from '@src/controller/user.controller';
import { ProductController } from '@src/controller/product.controller';

import { UserEntity } from '@src/entity/user.entity';
import { ProductEntity } from '@src/entity/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ProductEntity
    ])
  ],
  providers: [
    UserService,
    ProductService
  ],
  controllers: [
    ProductController,
    UserController
  ],
})
export class ApiModule { }
