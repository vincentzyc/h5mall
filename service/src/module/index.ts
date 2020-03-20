import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from '@src/service/user';
import { ProductService } from '@src/service/product';
import { AppWxpayService } from '@src/service/appWxpay';
import { AppMessageService } from '@src/service/message';

import { UserController } from '@src/controller/user';
import { ProductController } from '@src/controller/product';
import { AppWxpayController } from '@src/controller/appWxpay';
import { AppMessageController } from '@src/controller/message';

import { UserEntity } from '@src/entity/user';
import { ProductEntity } from '@src/entity/product';
import { ProductTypeEntity } from '@src/entity/product_type';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ProductEntity,
      ProductTypeEntity
    ])
  ],
  providers: [
    UserService,
    ProductService,
    AppWxpayService,
    AppMessageService
  ],
  controllers: [
    ProductController,
    UserController,
    AppWxpayController,
    AppMessageController
  ]
})
export class ApiModule { }
