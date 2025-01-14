import { RefreshToken } from '@prisma/client';
import { RefreshTokenEntity } from 'src/domain/entities/refresh-token.entity';

export class RefreshTokenMapper {
  static toDomain(raw: RefreshToken): RefreshTokenEntity {
    return new RefreshTokenEntity(raw.id, raw.userId, raw.token, raw.expiredAt);
  }

  static toPersistence(domain: RefreshTokenEntity): RefreshToken {
    const data = {
      id: domain.getId(),
      userId: domain.getUserId(),
      token: domain.getToken(),
      expiredAt: domain.getExpiredAt(),
    };
    return data;
  }
}
