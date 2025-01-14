import { Inject, Injectable } from '@nestjs/common';
import { RefreshTokenEntity } from 'src/domain/entities/refresh-token.entity';
import { IAdminRepository } from 'src/domain/interfaces/admin.interface';
import { IRefreshTokenRepository } from 'src/domain/interfaces/auth/refresh-token.interface';
import { IAuthPort } from 'src/domain/port/auth.port';
import { AuthResponseAdmin } from 'src/domain/types/auth.response';
import { compare } from 'src/infrastructure/libs/hash.service';
import { BadCredentialsException } from 'src/presentation/exceptions/auth.exception';
import { LoginAdminQuery } from './login-admin.query';

@Injectable()
export class LoginAdminHandler {
  constructor(
    @Inject('IAdminRepository')
    private readonly adminRepository: IAdminRepository,
    @Inject('IAuthPort')
    private readonly authPort: IAuthPort,
    @Inject('IRefreshTokenRepository')
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(query: LoginAdminQuery): Promise<AuthResponseAdmin> {
    const admin = await this.adminRepository.findByEmail(query.email);

    if (!admin) {
      throw new BadCredentialsException();
    }

    const isPasswordValid = await compare(query.password, admin.getPassword());

    if (!isPasswordValid) {
      throw new BadCredentialsException();
    }

    const accessToken = this.authPort.generateToken({
      id: admin.getId(),
      email: admin.getEmail(),
    });

    const refreshUserToken =
      await this.refreshTokenRepository.findRefreshTokenByUserId(admin.getId());

    const refreshToken = this.authPort.generateRefreshToken({
      id: admin.getId(),
      email: admin.getEmail(),
    });

    const createdRefreshToken = RefreshTokenEntity.create({
      userId: admin.getId(),
      token: refreshToken,
      expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });

    if (refreshUserToken) {
      await this.refreshTokenRepository.update(refreshUserToken.getId(), {
        token: refreshToken,
        expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      });
    } else {
      await this.refreshTokenRepository.create(createdRefreshToken);
    }

    return {
      accessToken,
      refreshToken,
      user: admin,
    };
  }
}
