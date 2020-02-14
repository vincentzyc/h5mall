import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { UserController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductService],
  controllers: [UserController],
})
export class ProductModule {}
