import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { IAuthPort } from 'src/domain/port/auth.port';

@Injectable()
export class JwtAdapter implements IAuthPort {
  constructor(private readonly configService: ConfigService) {}

  generateToken(payload: any): string {
    return jwt.sign(payload, this.configService.get('JWT_SECRET'), {
      expiresIn: '20m',
    });
  }

  generateRefreshToken(payload: any): string {
    return jwt.sign(payload, this.configService.get('JWT_SECRET'), {
      expiresIn: '30d',
    });
  }

  verifyToken(token: string): any {
    return jwt.verify(token, this.configService.get('JWT_SECRET'));
  }
}
