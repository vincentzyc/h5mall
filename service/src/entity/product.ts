import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface ProductResult {
  list: ProductEntity[],
  total: number
}

@Entity('h5mall_product')
export class ProductEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'name',
    comment: '商品名称',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    name: 'price',
    comment: '价格',
  })
  price: string;

  @Column('varchar', {
    nullable: true,
    name: 'cost',
    comment: '采购价',
  })
  cost: string;

  @Column('varchar', {
    nullable: true,
    name: 'carousel_img',
    comment: '商品图片',
  })
  carousel_img: string;

  @Column('varchar', {
    nullable: true,
    name: 'img',
    comment: '商品详情图片',
  })
  img: string;

  @Column('int', {
    name: 'virtual_num',
    comment: '商品详情图片',
  })
  virtual_num: number;

  @Column('int', {
    name: 'recommend',
    comment: '是否为推荐商品', // 0不推荐 1推荐
  })
  recommend: number;
  
}
