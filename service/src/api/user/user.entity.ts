import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export interface UserResult {
  list: UserEntity[],
  total: number
}

@Entity('usertest')
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    length: 10,
    name: 'username',
    comment: '用户名',
  })
  username: string;

  @Column('varchar', {
    nullable: false,
    name: 'password',
    comment: '密码',
  })
  password: string;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'email',
    comment: 'email',
  })
  email: string | null;

  @Column('varchar', {
    nullable: true,
    length: 11,
    name: 'phone',
    comment: '手机号码',
  })
  phone: string | null;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_at',
    comment: '创建时间',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_at',
    comment: '最后更新时间',
  })
  updateAt: Date;
}
