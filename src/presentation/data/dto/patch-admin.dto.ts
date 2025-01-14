import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PatchAdminDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsOptional()
  @IsString()
  prevPassword?: string;
}
