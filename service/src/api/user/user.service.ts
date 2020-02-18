import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, UserResult } from './user.entity';

interface UserQuery {
  pageSize?: number;
  pageIndex?: number;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async findAll(query: UserQuery): Promise<UserResult> {
    const [users, total] = await this.userRepository
      .createQueryBuilder('user')
      .offset(((query.pageIndex || 1) - 1) * (query.pageSize || 0)) // 从多少条开始
      .limit(query.pageSize) // 查询多少条数据
      .getManyAndCount(); // 查询到数据及个数，返回的是一个数组
    return {
      list: users,
      total: total
    };
  }
  async appUserReg(req): Promise<any> {
    console.log(req);
    // const user = await this.userRepository.create();
    // return await this.userRepository.save();
    return `This is a post test ---${JSON.stringify(req)}--- `;
  }
}
