import { AdminEntity } from '../entities/admin.entity';

export interface IAdminRepository {
  create(admin: AdminEntity): Promise<AdminEntity>;
  findAll(): Promise<AdminEntity[]>;
  findByEmail(email: string): Promise<AdminEntity | null>;
  findById(id: string): Promise<AdminEntity | null>;
  patchAdmin(id: string, key: string, value: string): Promise<string>;
}
