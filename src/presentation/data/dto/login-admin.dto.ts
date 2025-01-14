import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
