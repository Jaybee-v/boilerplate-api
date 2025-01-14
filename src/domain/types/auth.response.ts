import { AdminEntity } from '../entities/admin.entity';

export interface AuthResponseAdmin {
  accessToken: string;
  refreshToken: string;
  user: AdminEntity;
}
