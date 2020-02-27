import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, UserResult } from './user.entity';
import { UserDto } from './user.dto';
import { validate } from 'class-validator';
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
    let userPost = new UserDto();
    userPost.phone = userDto.phone;
    // userPost.name = userDto.name;
    userPost.password = userDto.password;
    const errors = await validate(userPost);
    if (errors.length > 0) {
      // 遍历全部的错误信息,返回给前端
      const errorMessage = errors.map(item => {
        return {
          message: '参数验证错误',
          currentValue: item.value === undefined ? '' : item.value,
          [item.property]: _.values(item.constraints)[0],
        };
      });
      // 返回异常
      console.log(JSON.stringify(errorMessage[0]));
      return JSON.stringify(errorMessage[0]);
    } else {
      console.log("validation succeed");
      let findUser = await this.userRepository.findOne({ phone: userPost.phone });
      if (Object.keys(findUser).length > 0) return '用户已存在';
      return await this.userRepository.save(userDto);
    }
  }
  async appUserLogin(userDto: UserDto): Promise<any> {
    let userPost = new UserDto();
    userPost.phone = userDto.phone;
    // userPost.name = userDto.name;
    userPost.password = userDto.password;
    const errors = await validate(userPost);
    if (errors.length > 0) {
      // 遍历全部的错误信息,返回给前端
      const errorMessage = errors.map(item => {
        return {
          message: '参数验证错误',
          currentValue: item.value === undefined ? '' : item.value,
          [item.property]: _.values(item.constraints)[0],
        };
      });
      // 返回异常
      console.log(JSON.stringify(errorMessage[0]));
      return JSON.stringify(errorMessage[0]);
    } else {
      console.log("validation succeed");
      let findUser = await this.userRepository.findOne({ phone: userPost.phone });
      if (Object.keys(findUser).length > 0) {
        if (findUser.password === userPost.password) return findUser
        // return '密码错误';
        throw new HttpException('密码错误', HttpStatus.OK);
      };
      return '用户未注册';
    }
  }
}
