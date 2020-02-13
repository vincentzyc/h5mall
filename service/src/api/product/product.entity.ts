import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

export interface ProductResult {
  list: ProductEntity[],
  total: number
}

@Entity('goods')
export class ProductEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'goodsid',
  })
  goodsid: number;

  @Column('varchar', {
    nullable: false,
    name: 'title',
    comment: '标题',
  })
  title: string;

  @Column('varchar', {
    nullable: false,
    name: 'price',
    comment: '价格',
  })
  price: string;

  @Column('varchar', {
    nullable: true,
    name: 'ad',
    comment: '广告词',
  })
  ad: string;

  @Column('varchar', {
    nullable: true,
    name: 'goodsimg',
    comment: '产品图片',
  })
  gppdsimg: string;

  @Column('varchar', {
    nullable: true,
    name: 'detailimg',
    comment: '详情图片',
  })
  detailimg: string;

  @Column('varchar', {
    nullable: true,
    name: 'spec',
    comment: '规格',
  })
  spec: string;

  @Column('varchar', {
    nullable: true,
    name: 'classify',
    comment: '分类',
  })
  classify: string;
}
