import { IsNotEmpty, IsString } from 'class-validator';
import { AuthBodyI } from '../interfaces/auth.interface';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO implements AuthBodyI {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
