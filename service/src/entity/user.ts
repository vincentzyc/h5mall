import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

export interface UserResult {
  list: UserEntity[],
  total: number
}

@Entity('h5mall_user')
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'name',
    comment: '用户名',
  })
  name: string;

  @Column('varchar', {
    nullable: true,
    length: 11,
    name: 'phone',
    comment: '手机号码',
  })
  phone: string | null;

  @Column('varchar', {
    nullable: false,
    name: 'password',
    comment: '密码',
  })
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_time',
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
    comment: '最后更新时间',
  })
  updateTime: Date;
}
