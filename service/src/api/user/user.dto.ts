import { IsString, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsString({ message: '手机号必须为字符类型' })
  @IsNotEmpty({ message: '手机号不能为空' })
  phone: string;

  @IsString({ message: '密码必须为字符串类型' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}