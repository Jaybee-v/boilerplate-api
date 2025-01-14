import { Inject, Injectable } from '@nestjs/common';
import { IAdminRepository } from 'src/domain/interfaces/admin.interface';
import { IRefreshTokenRepository } from 'src/domain/interfaces/auth/refresh-token.interface';
import { IAuthPort } from 'src/domain/port/auth.port';
import { UnAuthorizedTokenException } from 'src/presentation/exceptions/data.exception';
import { RefreshTokensQuery } from './refresh-tokens.query';

@Injectable()
export class RefreshTokensHandler {
  constructor(
    @Inject('IRefreshTokenRepository')
    private readonly refreshTokenRepository: IRefreshTokenRepository,
    @Inject('IAuthPort')
    private readonly authPort: IAuthPort,
    @Inject('IAdminRepository')
    private readonly adminRepository: IAdminRepository,
  ) {}

  async execute(
    query: RefreshTokensQuery,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { token } = query;

    const refreshToken =
      await this.refreshTokenRepository.findRefreshToken(token);

    if (!refreshToken) {
      throw new UnAuthorizedTokenException();
    }

    const now = new Date();

    if (now > refreshToken.getExpiredAt()) {
      console.log('refresh token expired');
      throw new UnAuthorizedTokenException();
    }

    const decodedToken = this.authPort.verifyToken(token);

    const admin = await this.adminRepository.findByEmail(decodedToken.email);

    const newToken = this.authPort.generateToken({
      id: admin.getId(),
      email: admin.getEmail(),
    });

    const newRefreshToken = this.authPort.generateRefreshToken({
      id: admin.getId(),
      email: admin.getEmail(),
    });

    await this.refreshTokenRepository.update(refreshToken.getId(), {
      token: newRefreshToken,
      expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });

    return {
      accessToken: newToken,
      refreshToken: newRefreshToken,
    };
  }
}
