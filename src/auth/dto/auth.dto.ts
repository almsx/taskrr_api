import { IsNotEmpty, IsString } from 'class-validator';
import { AuthBodyI } from '../interfaces/auth.interface';

export class AuthDTO implements AuthBodyI {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
