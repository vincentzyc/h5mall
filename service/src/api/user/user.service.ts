import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, UserResult } from './user.entity';
import { UserDto } from './user.dto';
import * as _ from 'lodash';

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
  async appUserReg(userDto: UserDto): Promise<any> {
    const { phone } = userDto;
    let result: Number = await this.userRepository.count({ phone: phone });
    if (result) throw new HttpException('用户已存在', HttpStatus.OK);
    return await this.userRepository.save(userDto);
  }
  async appUserLogin(userDto: UserDto): Promise<any> {
    const { phone, password } = userDto;
    let findUser = await this.userRepository.findOne({ phone: phone });
    if (Object.keys(findUser).length > 0) {
      if (findUser.password === password) return findUser
      throw new HttpException('密码错误', HttpStatus.OK);
    }
    throw new HttpException('用户未注册', HttpStatus.OK);
  }
}
