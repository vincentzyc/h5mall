import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('h5mall_specs')
export class SpecsEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    name: 'specsImg',
    comment: '规格图片',
  })
  specsImg: string;

  @Column('varchar', {
    name: 'specsPrice',
    comment: '规格价格',
  })
  specsPrice: string;

  @Column('varchar', {
    name: 'cost',
    comment: '规格成本',
  })
  cost: string;

  @Column('varchar', {
    name: 'specsName',
    comment: '规格名称',
  })
  specsName: string;

  @Column('int', {
    name: 'productId',
    comment: '产品id',
  })
  productId: string;

  // 规格状态，1启用，0禁用	
  @Column('int', {
    name: 'state',
    comment: '规格状态',
  })
  state: number;
}
