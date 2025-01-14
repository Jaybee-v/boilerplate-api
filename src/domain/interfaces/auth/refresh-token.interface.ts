import { RefreshTokenEntity } from 'src/domain/entities/refresh-token.entity';

export interface IRefreshTokenRepository {
  create(token: RefreshTokenEntity): Promise<void>;
  findRefreshToken(token: string): Promise<RefreshTokenEntity | null>;
  findRefreshTokenByUserId(userId: string): Promise<RefreshTokenEntity | null>;
  update(id: string, data: { token: string; expiredAt: Date }): Promise<void>;
}
