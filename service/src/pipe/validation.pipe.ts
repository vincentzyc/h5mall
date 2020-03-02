/*
 * 统一封装拦截请求错误参数
 */
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import * as _ from 'lodash';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      // 遍历全部的错误信息,返回给前端
      // const errorMessage = errors.map(item => {
        // return {
        //   message: '参数验证错误',
        //   currentValue: item.value === undefined ? '' : item.value,
        //   [item.property]: _.values(item.constraints)[0],
        // };
      // });
      const errorMessage = _.values(errors[0].constraints)[0]
      // 统一抛出异常
      throw new HttpException(errorMessage, HttpStatus.OK);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}