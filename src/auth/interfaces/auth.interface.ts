import { ROLES } from 'src/constants/roles';

export interface PayloadTokenI {
  sub: string;
  role: ROLES;
}

export interface AuthBodyI {
  username: string;
  password: string;
}
