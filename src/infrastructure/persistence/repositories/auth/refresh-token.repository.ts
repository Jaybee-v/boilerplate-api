import { Injectable } from '@nestjs/common';
import { RefreshTokenEntity } from 'src/domain/entities/refresh-token.entity';
import { IRefreshTokenRepository } from 'src/domain/interfaces/auth/refresh-token.interface';
import { PrismaService } from 'src/infrastructure/config/prisma.service';
import { RefreshTokenMapper } from '../../mappers/auth/refresh-token.mapper';

@Injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(token: RefreshTokenEntity): Promise<void> {
    await this.prisma.refreshToken.create({
      data: {
        id: token.getId(),
        userId: token.getUserId(),
        token: token.getToken(),
        expiredAt: token.getExpiredAt(),
      },
    });
    return;
  }

  async findRefreshToken(token: string): Promise<RefreshTokenEntity | null> {
    const refreshToken = await this.prisma.refreshToken.findFirst({
      where: {
        token,
      },
    });
    if (!refreshToken) return null;

    return RefreshTokenMapper.toDomain(refreshToken);
  }

  async findRefreshTokenByUserId(
    userId: string,
  ): Promise<RefreshTokenEntity | null> {
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: {
        userId,
      },
    });
    if (!refreshToken) return null;

    return RefreshTokenMapper.toDomain(refreshToken);
  }

  async update(
    id: string,
    data: { token: string; expiredAt: Date },
  ): Promise<void> {
    await this.prisma.refreshToken.update({
      where: { id: id },
      data: {
        token: data.token,
        expiredAt: data.expiredAt,
      },
    });
  }
}
