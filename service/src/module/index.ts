import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from '@src/service/user';
import { ProductService } from '@src/service/product';
import { AppWxpayService } from '@src/service/appWxpay';

import { UserController } from '@src/controller/user';
import { ProductController } from '@src/controller/product';
import { AppWxpayController } from '@src/controller/appWxpay';

import { UserEntity } from '@src/entity/user';
import { ProductEntity } from '@src/entity/product';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ProductEntity
    ])
  ],
  providers: [
    UserService,
    ProductService,
    AppWxpayService
  ],
  controllers: [
    ProductController,
    UserController,
    AppWxpayController
  ],
})
export class ApiModule { }
