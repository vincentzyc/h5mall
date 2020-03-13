import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('h5mall_type')
export class ProductTypeEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    name: 'name',
    comment: '分类名称',
  })
  name: string;

  @Column('varchar', {
    name: 'order_num',
    comment: '分类排序',
  })
  order_num: number;

  @Column('varchar', {
    name: 'img',
    comment: '分类图标',
  })
  img: string;

  @Column('varchar', {
    name: 'parent_id',
    comment: '分类id',
  })
  parent_id: number;
}
