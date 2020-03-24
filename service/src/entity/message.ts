import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('h5mall_message')
export class MessageEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('int', {
    name: 'user_id',
    comment: '用户id',
  })
  user_id: number;

  @Column('varchar', {
    name: 'message_head',
    comment: '消息标题',
  })
  message_head: string;

  @Column('varchar', {
    name: 'message',
    comment: '消息内容',
  })
  message: string;

  // 消息状态，0未读，1已读	
  @Column('int', {
    name: 'state',
    comment: '消息状态',
  })
  state: number;

  // 消息类型，0系统消息，1交易消息，2报价消息，3农户通知，4普通聊天消息	
  @Column('int', {
    name: 'type',
    comment: '消息类型',
  })
  type: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_time',
    comment: '创建时间',
  })
  create_time: Date;
}
