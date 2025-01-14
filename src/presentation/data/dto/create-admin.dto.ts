import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AdminRole } from 'src/domain/entities/admin.entity';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(AdminRole)
  role: AdminRole;
}
